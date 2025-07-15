import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { EmployeeService } from '../services/employee.service';
import { BranchService } from '../services/branch.service';
import { SaveServiceService } from '../services/save services/save.service';
import { CheckPermissionDto, PermissionDTO, RegisterEmployeeDTO } from '../models/employee/employeedto';

@Component({
  selector: 'app-update-employee',
    imports: [
    FormsModule,
    ReactiveFormsModule,
        CommonModule,        

  ],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  updateForm!: FormGroup;
  userId!: string;
  allBranches: any[] = [];
  allSafes: any[] = [];
  allPermissions: PermissionDTO[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private safeService: SaveServiceService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadInitialData();
    this.loadEmployeeData();
  }

  initForm() {
    this.updateForm = this.fb.group({
      userId: [''],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      isActive: [true],
      branchIds: [[], Validators.required],
      safeIds: [[], Validators.required],
      permissionActionIds: [[]],
    });
  }

  loadInitialData() {
    this.branchService.getAllBranches().subscribe(res => this.allBranches = res);
    this.safeService.getAllSaves().subscribe(res => this.allSafes = res);
    this.employeeService.getAllPermissions().subscribe(res => this.allPermissions = res);
  }
loadUserPermissions(userId: string) {
  const selectedPermissions: number[] = [];

  this.allPermissions.forEach((perm) => {
    const dto: CheckPermissionDto = {
      userId: userId,
      permissionName: perm.name,
      actionTypeId: perm.id, // لو دي هي ActionTypeId
    };

    this.employeeService.checkPermission(dto).subscribe({
      next: (res) => {
        if (res.hasPermission) {
          selectedPermissions.push(perm.id);
        }
      },
      complete: () => {
        // لما نخلص كل ال permissions نعمل patch
        this.updateForm.patchValue({
          permissionActionIds: selectedPermissions
        });
      }
    });
  });
}
loadEmployeeData() {
  this.employeeService.getEmployeeById(this.userId).subscribe({
    next: (emp) => {
      this.updateForm.patchValue({
        userId: emp.userId,
        fullName: emp.fullName,
        userName: emp.userName,
        email: emp.email,
        address: emp.address,
        isActive: emp.isActive,
        branchIds: emp.branchIds || [],
        safeIds: emp.safeIds || [],
      });
      this.loadUserPermissions(emp.userId);
    },
    error: (err) => {
      this.errorMessage = 'Failed to load employee data';
      console.error(err);
    }
  });
}

  onSubmit() {
    if (this.updateForm.invalid) return;

    const updatedData: RegisterEmployeeDTO = this.updateForm.value;

    this.employeeService.updateEmployee(updatedData).subscribe({
      next: () => {
        this.successMessage = 'Employee updated successfully.';
        setTimeout(() => this.router.navigate(['/employees']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Update failed.';
        console.error(err);
      }
    });
  }
}
