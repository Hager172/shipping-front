import { Component, OnInit } from '@angular/core';
import { BranchDTO } from '../../../models/branch/branch';
import { BranchService } from '../../../services/branch.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../../../services/city.service';
import { CityDTO } from '../../../models/city/city.model';

@Component({
  selector: 'app-edit-branch',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.css'
})
export class EditBranchComponent implements OnInit {
  cities: CityDTO[] = [];
  branch: BranchDTO = {
    id: 0,
    name: '',
    address: '',
    CityId: 0,
    cityName: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private branchService: BranchService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // تحميل قائمة المدن
    this.cityService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load cities';
        console.error(err);
      }
    });

    // تحميل بيانات الفرع المُراد تعديله
    if (this.branchService.selectedBranch) {
      this.branch = { ...this.branchService.selectedBranch };
    } else {
      console.error('No branch selected');
      this.router.navigate(['/branches']);
    }
  }

  updateBranch(): void {
    console.log(this.branch);
    this.errorMessage = '';
    this.successMessage = '';
    this.branchService.updateBranch(this.branch).subscribe({
      next: (res) => {
        this.successMessage = 'Branch updated successfully';
        this.router.navigate(['/branches']);
      },
      error: (err) => {
        if (typeof err.error === 'string') {
          this.errorMessage = 'Error updating branch: ' + err.error;
        } else if (err.error?.message) {
          this.errorMessage = 'Error updating branch: ' + err.error.message;
        } else {
          this.errorMessage = 'Unknown error occurred';
        }
        console.error('Error updating branch:', err);
      }
    });
  }
}
