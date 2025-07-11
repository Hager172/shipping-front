import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Governorate, GovernorateDTO } from '../../../models/governrate/governrate';
import { GovernrateService } from '../../../services/governrate.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-governorate',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './edit-governorate.component.html',
  styleUrl: './edit-governorate.component.css'
})
export class EditGovernorateComponent implements OnInit {
 governorate: GovernorateDTO = { id: 0, name: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private govService: GovernrateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.govService.selectedGovernorate) {
      this.router.navigate(['/governorates']);
      return;
    }

    this.governorate = { ...this.govService.selectedGovernorate };
  }

  updateGovernorate() {
    this.errorMessage = '';
    this.successMessage = '';

    this.govService.update(this.governorate).subscribe({
      next: (res) => {
        this.successMessage = 'Governorate updated successfully';
        this.router.navigate(['/governorates']);
      },
      error: (err) => {
        if (typeof err.error === 'string') {
          this.errorMessage = 'Error updating governorate: ' + err.error;
        } else if (err.error?.message) {
          this.errorMessage = 'Error: ' + err.error.message;
        } else if (err.error?.errors) {
          const allErrors = Object.values(err.error.errors).flat();
          this.errorMessage = allErrors.join(' | ');
        } else {
          this.errorMessage = 'Unknown error occurred';
        }

        console.error('Error updating governorate:', err);
      }
    });
  }
}
