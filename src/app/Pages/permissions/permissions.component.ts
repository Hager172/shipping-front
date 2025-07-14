import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../../services/permission services/permission.service';
import { ActionTypeDto } from '../../models/permission/action-type-dto';
import { PermissionDto } from '../../models/permission/permission-dto';
import { ButtonStyleComponent } from "../../components/button-style/button-style.component";
import { CustomTableComponent } from "../../components/custom-table/custom-table.component";
import { Router } from '@angular/router';
import { SharedModalComponent } from "../../components/shared-modal/shared-modal.component";

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomTableComponent, SharedModalComponent],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  actionTypes: ActionTypeDto[] = [];
  permissions: any[] = [];
  newPermissionName: string = '';
  searchTerm: string = '';
  editingPermission: PermissionDto | null = null;
  deletingPermission: PermissionDto | null = null;

  showEditModal = false;
  showDeleteModal = false;

  editedName = '';
  editedDescription = '';

  columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
  ];

  constructor(private permissionService: PermissionService, private router: Router) { }

  ngOnInit(): void {
    this.loadPermissions();
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
      error: err => console.error("❌ Failed to load permissions:", err)
    });
  }

  get filteredPermissions(): PermissionDto[] {
    return this.permissions.filter(permission =>
      permission.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addnewpermission(): void {
    console.log("dhvdhvhjdb")
    this.router.navigate(['addpermission']);
  }

  openEditModal(permission: PermissionDto) {
  this.editingPermission = { ...permission };
  this.editedName = permission.name;
  this.editedDescription = permission.description || '';
  this.showEditModal = true;
}
saveEdit() {
  if (!this.editingPermission) return;

  const updatedPermission: PermissionDto = {
    ...this.editingPermission,
    name: this.editedName,
    description: this.editedDescription
  };

  this.permissionService.updatePermission(updatedPermission.id, updatedPermission).subscribe({
  next: () => {
    alert("✔️ Permission updated");
    this.showEditModal = false;
    this.loadPermissions();
  },
  error: err => {
    console.error("❌ Failed to update:", err);
    alert("❌ Update failed");
  }
});
}
openDeleteModal(permission: PermissionDto) {
  this.deletingPermission = permission;
  this.showDeleteModal = true;
}
confirmDelete() {
  if (!this.deletingPermission) return;

  this.permissionService.deletePermission(this.deletingPermission.id).subscribe({
    next: () => {
      alert("🗑️ Permission deleted");
      this.showDeleteModal = false;
      this.loadPermissions();
    },
    error: err => {
      console.error("❌ Failed to delete:", err);
      alert("❌ Deletion failed");
    }
  });
}

}
