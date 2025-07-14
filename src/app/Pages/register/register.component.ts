import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
 errormessage: string = '';
  roles: string[] = [];
  ngOnInit(): void {
  //  this.authservice.getroles().subscribe({
  //     next: (data) => {
  //       this.roles = data;
  //       this.errormessage = '';
  //     },
  //     error: (err) => {
  //       console.error('Error fetching roles:', err);
  //        this.errormessage = err.error.message || 'An error occurred during registration. Please try again.';
  //     }
  //   });
  }

  constructor(private http:HttpClient, private authservice :AuthService , private router:Router) { }
onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errormessage = 'Please fill out all required fields correctly.';
      return;}
          const formData = {
      ...form.value,
      role: 'Admin'
    };
    this.authservice.regester(form.value).subscribe({
      next:(data)=>{

                 this.errormessage = '';
                this.router.navigate(['/login']); // Redirect to login page after successful registration

        // Optionally, redirect to login or another page
      },
      error:(err)=>{
        this.errormessage = err.error.message || 'An error occurred during registration. Please try again.';
        alert('Registration failed');

      }
    })


}}
