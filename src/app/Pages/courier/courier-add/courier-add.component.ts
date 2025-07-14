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
  console.log(this.courierForm.value)
  this.errormessage = '';
  this.successmessage = '';

  if (this.courierForm.valid) {
   this.courierForm.value.discountType = Number(this.courierForm.value.discountType);
    this.courierService.addCourier(this.courierForm.value).subscribe({
      next: (res) => {
        this.errormessage='';
        this.successmessage = res.message;
        setTimeout(() => {
          this.successmessage='';

        }, 2000);
        this.courierForm.reset();
      },
      error: (err) => {
          this.successmessage='';
        if (typeof err.error === 'string') {
          this.errormessage = 'Error: ' + err.error;

        } else if (Array.isArray(err.error?.errors)) {
          // لو السيرفر رجّع مصفوفة Errors
          this.errormessage = err.error.errors.join(' | ');

        } else if (err.error?.message) {
          this.errormessage = err.error.message;

        } else {
          this.errormessage = 'Unknown error occurred';
        }
 setTimeout(() => {
          this.errormessage='';

        }, 2000);
        console.error('Error adding courier:', err);
      }
    });
  } else {
    this.errormessage = 'Please fill the form correctly.';
    console.warn('Form is invalid:', this.courierForm.errors);
  }
}



}
