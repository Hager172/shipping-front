import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../../services/permission services/permission.service';
import { ActionTypeDto } from '../../models/permission/action-type-dto';
import { PermissionDto } from '../../models/permission/permission-dto';
import { ButtonStyleComponent } from "../../components/button-style/button-style.component";
import { CustomTableComponent } from "../../components/custom-table/custom-table.component";
import { CustomTableWithoutActionComponent } from "../../components/custom-table-without-action/custom-table-without-action.component";

@Component({
  selector: 'app-add-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.css'
})
export class AddPermissionComponent {

  actionTypes: ActionTypeDto[] = [];
  permissions: any[] = [];
  newPermissionName: string = '';
  searchTerm: string = '';

  currentPage = 1;
  itemsPerPage = 10;

  get totalPages(): number[] {
    const pagesCount = Math.ceil(this.permissions.length / this.itemsPerPage);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }


  goToPage(page: number) {
    this.currentPage = page;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.permissions.slice(start, start + this.itemsPerPage);
  }


  constructor(private permissionService: PermissionService) { }


  ngOnInit(): void {
    this.loadActionTypes();
    this.loadPermissions();
  }
  loadActionTypes() {
    this.permissionService.getActionTypes().subscribe({
      next: data => this.actionTypes = data,
      error: err => console.error(" Failed to load action types:", err)
    });
  }
  addPermission() {
    if (!this.newPermissionName.trim()) {
      alert(" Please enter a permission name first.");
      return;
    }

    const dto: PermissionDto = {
      id: 0,
      name: this.newPermissionName,
      description: ''
    };

    this.permissionService.createPermission(dto).subscribe({
      next: () => {
        this.newPermissionName = '';
        this.loadPermissions();
        alert("Permission successfully added.");
      },
      error: err => {
        console.error(err);
        alert("An error occurred while adding the permission.");
      }
    });
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: data => {
        this.permissions = data.map((p: PermissionDto) => ({
          ...p,
          selectedActions: {}
        }));

        this.permissions.forEach(permission => {
          this.permissionService.getActionsByPermissionId(permission.id).subscribe({
            next: res => {
              res.actions.forEach((action: ActionTypeDto) => {
                permission.selectedActions[action.id] = true;
              });
            }
          });
        });
      },
      error: err => console.error(" Failed to load permissions:", err)
    });
  }

  toggleAction(permission: any, actionId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (!permission.selectedActions) {
      permission.selectedActions = {};
    }

    if (isChecked) {
      if (permission.selectedActions[actionId]) {
        alert("⚠ This action is already assigned.");
        return;
      }

      permission.selectedActions[actionId] = true;

      this.permissionService.assignPermissions({
        permissionId: permission.id,
        actionTypeIds: [actionId]
      }).subscribe({
        next: () => console.log("Action assigned."),
        error: err => {
          console.error(" Error while assigning:", err);
          delete permission.selectedActions[actionId];
        }
      });

    } else {
      this.permissionService.removePermissionAction({
        permissionId: permission.id,
        actionTypeIds: [actionId]
      }).subscribe({
        next: () => {
          delete permission.selectedActions[actionId];
          console.log(" Action removed.");
        },
        error: err => {
          console.error(" Failed to remove action:", err);
          permission.selectedActions[actionId] = true;
        }
      });
    }
  }

  save() {
    const assignments = this.permissions
      .map(perm => {
        if (!perm.id || perm.id === 0) return null;

        const selected = Object.entries(perm.selectedActions)
          .filter(([_, value]) => value)
          .map(([id, _]) => +id);

        if (selected.length === 0) return null;

        return {
          permissionId: perm.id,
          actionTypeIds: selected
        };
      })
      .filter(a => a !== null);

    console.log('Assignments:', assignments);

    for (const assignment of assignments) {
      this.permissionService.assignPermissions(assignment).subscribe({
        next: () => console.log(' Assignment saved.'),
        error: (err) => console.error(' Failed to save assignment:', err)
      });
    }
  }
}
