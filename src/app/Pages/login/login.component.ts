import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router,  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginform:FormGroup;
errormessage: string ='';
constructor(private fb:FormBuilder,private authservice:AuthService,private router: Router) {
  this.loginform=this.fb.group({
    userName: ['',Validators.required],
    password: ['',Validators.required]
  });

}
onsubmit(){
  if(!this.loginform.valid){
       this.errormessage = 'Please fill out all required fields correctly.';
    return;}
  this.authservice.login(this.loginform.value).subscribe({
    next:(data)=>{
 this.authservice.savetoken(data.token);
      this.router.navigate(['/cities']);


    },
    error:(err)=>{
      this.errormessage=err.error.message || 'An error occurred during login. Please try again.';
    }
  })

}

}
