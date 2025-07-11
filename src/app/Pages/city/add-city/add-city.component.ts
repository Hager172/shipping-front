import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City, CityDTO } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GovernorateDTO } from '../../../models/governrate/governrate';
import { GovernrateService } from '../../../services/governrate.service';

@Component({
  selector: 'app-add-city',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent implements OnInit {
  governrates:GovernorateDTO[] = [];
city:City = {
  name: '',
  GovernorateId: 0,
  pricePerKg: 0,
  pickupCost: 0,
  isActive: true}
  errormessage: string = '';
  successmessage: string = '';
  ngOnInit(): void {
this.governrateservice.getAll().subscribe({
  next:(res)=>{
    this.governrates = res;
  },
  error:(err)=>{
    console.error('Error fetching governorates:', err);
    this.errormessage = 'Failed to load governorates';

  }});
  }
  constructor(private cityservice:CityService, private router:Router,private governrateservice:GovernrateService) { }
  addcity(){
    this.errormessage = '';
    this.successmessage = '';
    this.cityservice.addCity(this.city).subscribe({
      next: (res) => {
        console.log('City added successfully', res);
        this.successmessage = 'City added successfully';
        this.router.navigate(['/cities']);
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

  console.error('Error adding city:', err);
}

    });
  }

}
