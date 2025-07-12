import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { BranchService } from '../../../services/branch.service';
import { Route, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-branch',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent implements OnInit {
  constructor(private citiesservice:CityService,private branchservice:BranchService,private router:Router){}

  cities: CityDTO[]=[];
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    this.citiesservice.getAllCities().subscribe({
      next:(data)=>{
        this.cities = data;
      },
      error:(err)=>{
        this.errorMessage=err.error.message||err.error.errors.message||'Failed to load cities';

      }
    })

  }
  onSubmit(form:NgForm){
    this.errorMessage='';
    this.successMessage='';
    if(form.invalid){
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }
    this.branchservice.addBranch(form.value).subscribe({
      next:(data)=>{
        this.successMessage = 'Branch added successfully';
this.router.navigate(['/branches']);

      },
        error: (err) => {
      console.error('Error adding branch:', err);

      // لو فيه رسالة مباشرة
      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
      // لو ModelState Errors (object فيه keys)
      else if (err.error.errors && typeof err.error.errors === 'object') {
        const messages = [];
        for (const key in err.error.errors) {
          if (Array.isArray(err.error.errors[key])) {
            messages.push(...err.error.errors[key]);
          }
        }
        this.errorMessage = messages.join(' | ');
      }
      // fallback
      else {
        this.errorMessage = 'An error occurred while adding the branch. Please try again.';
      }
    }
    })
  }


}
