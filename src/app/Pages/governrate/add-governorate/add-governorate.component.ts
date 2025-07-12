import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GovernrateService } from '../../../services/governrate.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-governorate',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './add-governorate.component.html',
  styleUrl: './add-governorate.component.css'
})
export class AddGovernorateComponent {
  constructor(private governservice:GovernrateService){}
  errorMessage: string = '';
  successMessage: string = '';
onSubmit(form :NgForm){
  this.errorMessage='';
  this.successMessage='';
  if(form.invalid){
    this.errorMessage = 'Please fill out all required fields correctly.';
    return;

  }
this.governservice.add(form.value).subscribe({
  next:(data)=>{
    this.successMessage = 'Governorate added successfully';
    form.reset();
  },
  error: (err) => {
    console.error('Error adding governorate:', err);

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
        } else {
          messages.push(err.error.errors[key]);
        }
      }
      this.errorMessage = messages.join(' | ');
    } else {
      this.errorMessage = 'Unknown error occurred';
    }
  }
})
}
}
