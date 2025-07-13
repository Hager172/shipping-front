import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourierService } from '../../../services/courier.service';
import { Router } from '@angular/router';
import { BranchService } from '../../../services/branch.service';
import { GovernrateService } from '../../../services/governrate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courier-edit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './courier-edit.component.html',
  styleUrl: './courier-edit.component.css'
})
export class CourierEditComponent implements OnInit {
  courierForm!: FormGroup;
  allGovernorates: any[] = [];
  allBranches: any[] = [];

  errormessage = '';
  successmessage = '';

  selectedGovernorateIds: number[] = [];
  selectedBranchIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router,
    private branchservice:BranchService,
    private governservice:GovernrateService
  ) {}

  ngOnInit(): void {
    const selected = this.courierService.selectedCourier;
    if (!selected) {
      this.router.navigate(['/couriers']);
      return;
    }

    this.loadGovernorates();
    this.loadBranches();

    this.selectedGovernorateIds = [];
    this.selectedBranchIds =  [];

    this.courierForm = this.fb.group({
      id: [selected.userId],
      userName: [selected.userName, Validators.required],
      email: [selected.email, [Validators.required, Validators.email]],
      password: [selected.password], // optional on edit
      fullName: [selected.fullName, Validators.required],
      address: [selected.address, Validators.required],
      phoneNumber: [selected.phoneNumber, Validators.required],
      discountType: [selected.discountType, Validators.required],
      orderShare: [selected.orderShare, [Validators.required, Validators.min(0), Validators.max(100)]],
      selectedGovernorateIds: [[]], // set in submit
      selectedBranchIds: [[]] // set in submit
    });
  }

  loadGovernorates() {
    this.governservice.getAll().subscribe(data => {
      this.allGovernorates = data;
    });
  }

  loadBranches() {
    this.branchservice.getAllBranches().subscribe(data => {
      this.allBranches = data;
    });
  }

  onGovernoratesChange(event: Event) {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedGovernorateIds = Array.from(selectedOptions).map(option => +option.value);
  }
  onBranchesChange(event: Event) {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedBranchIds = Array.from(selectedOptions).map(option => +option.value);
  }

  onSubmit(): void {
    if (this.courierForm.invalid) return;

    const updatedCourier = {
      ...this.courierForm.value,
      discountType: Number(this.courierForm.value.discountType),
      selectedGovernorateIds: this.selectedGovernorateIds,
      selectedBranchIds: this.selectedBranchIds
    };
  console.log('Sending Courier Data:', updatedCourier);
    this.courierService.updateCourier(updatedCourier).subscribe({
      next: () => {
        this.successmessage = 'Courier updated successfully!';
        // setTimeout(() => this.router.navigate(['/couriers']), 5000);
      },
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
    }

}
