import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GovernrateService } from '../../../services/governrate.service';
import { GovernorateDTO } from '../../../models/governrate/governrate';

@Component({
  selector: 'app-edit-city',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css'
})
export class EditCityComponent implements OnInit {
  governrates:GovernorateDTO[] = [];
  errormessage: string = '';
  successmessage: string = '';
  city:CityDTO={
    id: 0,
    name: '',
    goverrateName: '',
   GovernorateId: 0,
    pricePerKg: 0,
    pickupCost: 0,
    isActive: true
  }

  ngOnInit(): void {


    this.governrateservice.getAll().subscribe({
  next:(res)=>{
    this.governrates = res;
  },
  error:(err)=>{
    console.error('Error fetching governorates:', err);
    this.errormessage = 'Failed to load governorates';

  }});
    if (this.cityservice.selectedCity){
    this.city = this.cityservice.selectedCity;}
  else{
    console.error('No city selected');
    this.router.navigate(['/cities']);
  }

  }
    constructor(private cityservice :CityService,private router:Router,private governrateservice:GovernrateService){}



  updatecity(){
    this.errormessage = '';
    this.successmessage = '';
    this.cityservice.updateCity(this.city).subscribe({
      next:(res)=>{
        console.log('City updated successfully', res);
        this.successmessage = 'City updated successfully';

      },
  error: (err) => {
  if (typeof err.error === 'string') {
    this.errormessage = 'Error updating city: ' + err.error;
  } else if (err.error?.message) {
    this.errormessage = 'Error updating city: ' + err.error.message;
  } else {
    this.errormessage = 'Unknown error occurred';
  }

  console.error('Error updating city:', err);
}
    })
  }
  }



