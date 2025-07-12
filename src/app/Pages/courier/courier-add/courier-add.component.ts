import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourierService } from '../../../services/courier.service';
import { Router } from '@angular/router';
import { BranchService } from '../../../services/branch.service';
import { GovernrateService } from '../../../services/governrate.service';
import { CommonModule } from '@angular/common';
import { Governorate, GovernorateDTO } from '../../../models/governrate/governrate';
import { Branch, BranchDTO } from '../../../models/branch/branch';

@Component({
  selector: 'app-courier-add',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './courier-add.component.html',
  styleUrl: './courier-add.component.css'
})
export class CourierAddComponent implements OnInit {
  courierForm!: FormGroup;
  errormessage:string='';
  successmessage:string='';

  allGovernorates: GovernorateDTO[] = [];
  allBranches: BranchDTO[] = [];

  constructor(private fb: FormBuilder, private courierService: CourierService,private branchservice:BranchService,private governservice:GovernrateService) {}

  ngOnInit(): void {
    this.courierForm = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      orderShare: [0, Validators.required],
      discountType: [0, Validators.required],
      selectedGovernorateIds: [[], Validators.required],
      selectedBranchIds: [[], Validators.required]
    });

    this.loadGovernorates();
    this.loadBranches();
  }

  loadGovernorates() {
    this.governservice.getAll().subscribe({
      next: (data) => this.allGovernorates = data,
      error: (err) => console.error('Error loading governorates:', err)
    });
  }

  loadBranches() {
    this.branchservice.getAllBranches().subscribe({
      next: (data) => this.allBranches = data,
      error: (err) => console.error('Error loading branches:', err)
    });
  }

  onGovernoratesChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(opt => +opt.value);
    this.courierForm.patchValue({ selectedGovernorateIds: selectedOptions });
  }

  onBranchesChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(opt => +opt.value);
    this.courierForm.patchValue({ selectedBranchIds: selectedOptions });
  }

  addCourier() {
    this.errormessage='';
    this.successmessage='';
      console.log('Sending Courier Data:', this.courierForm.value);
    if (this.courierForm.valid) {
      console.log('Sending Courier Data:', this.courierForm.value);
      this.courierService.addCourier(this.courierForm.value).subscribe({
        next: (res) => console.log('Courier added successfully!', res),
         error: (err) => {
  // لو الخطأ رسالة string مباشرة (زي اللي انت شفتيه قبل كده)
  if (typeof err.error === 'string') {
    this.errormessage = 'Error: ' + err.error;

  // لو ModelState errors (validation errors)
  } else if (err.error?.errors) {
    const errors = err.error.errors;
    const messages: string[] = [];

    // لفّي على المفاتيح وخدي كل رسالة
    for (let key in errors) {
      if (errors[key] && Array.isArray(errors[key])) {
        messages.push(...errors[key]);
      }
    }

    this.errormessage = messages.join(' | ');

  // لو رسالة عادية (زي error.message)
  } else if (err.error?.message) {
    this.errormessage = 'Error: ' + err.error.message;

  } else {
    this.errormessage = 'Unknown error occurred';
  }

  console.error('Error adding curier:', err);
}

      });
    } else {
      console.warn('Form is invalid:', this.courierForm.errors);
      Object.keys(this.courierForm.controls).forEach(key => {
  const controlErrors = this.courierForm.get(key)?.errors;
  if (controlErrors) {
    console.log(`${key} has errors:`, controlErrors);
    this.errormessage=`fill the form`;
  }
});

    }
  }


}
