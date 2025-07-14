import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { SaveService } from '../../services/Financial-transferServices/Save/saveFinancial.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { PermissionDTO, RegisterEmployeeDTO } from '../../models/employee/employeedto';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveServiceService } from '../../services/save services/save.service';

@Component({
  selector: 'app-register-employee',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css'
})
export class RegisterEmployeeComponent implements OnInit {
  registerForm!:FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  allBranches: any[] = [];
  allSafes: any[] = [];
 allPermissions: PermissionDTO[] = [];

  constructor(private fb:FormBuilder, private branchservice:BranchService,private safeservice:SaveServiceService,private http:HttpClient,private employeeservice:EmployeeService,private router:Router){}

ngOnInit(): void {
  this.registerForm=this.fb.group({
    fullName:['',Validators.required],
    userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: [''],
      branchIds: [[], Validators.required],
      safeIds: [[], Validators.required],
      permissionActionIds: [[]],
  })

  this.loadinitialdata();
}

loadinitialdata(){
 this.branchservice.getAllBranches().subscribe((res) => (this.allBranches = res));
 this.safeservice. getAllSaves().subscribe((res) => (this.allSafes = res));
  this.employeeservice.getAllPermissions().subscribe({
  next: (res) => {
    this.allPermissions = res;
  },
  error: (err) => {
    console.error('Error fetching permissions', err);
  }
});

}
 onSubmit() {
    if (this.registerForm.invalid) return;

    const data: RegisterEmployeeDTO = this.registerForm.value;

    console.log(data);
    this.employeeservice.regesteremployee(data).subscribe({
      next: (res) => {
             this.errorMessage = '';
        this.successMessage = 'Employee registered successfully.';

        setTimeout(()=>{
          this.successMessage='';
        },2000)
        console.log('done') // او أي روت ترجعيله بعد التسجيل
      },
 error: (err) => {
      console.error('Full error:', err);

      if (err.error instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorObj = JSON.parse(reader.result as string);
            this.errorMessage = errorObj.message || 'حدث خطأ غير متوقع';
          } catch (e) {
            this.errorMessage = 'حدث خطأ أثناء قراءة الرد من السيرفر';
          }
        };
        reader.readAsText(err.error);
      } else if (typeof err.error === 'string') {
        this.errorMessage = err.error;
      } else if (err.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'حدث خطأ غير معروف';
      }
    }
    });
  }



}
