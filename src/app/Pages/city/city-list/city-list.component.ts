import { Component, OnInit } from '@angular/core';
import { City, CityDTO } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  imports: [CommonModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit {
  constructor(private cityService: CityService, private router :Router) { }
  cities: CityDTO[] = [];
  filtered: CityDTO[] = [];

  citySearchTerm = '';
  governorateSearchTerm = '';
  ngOnInit(): void {
     this.loadCities();
  }
  loadCities(){
    this.cityService.getAllCities().subscribe((data:CityDTO[])=>{
      this.cities = data;
      this.filtered = data;
    }
    )}
     filterCities() {
    this.filtered = this.cities.filter(city => {
      const matchesCity =
        this.citySearchTerm === '' || city.name.toLowerCase().includes(this.citySearchTerm.toLowerCase());
      const matchesGov =
        this.governorateSearchTerm === '' || city.goverrateName.toLowerCase().includes(this.governorateSearchTerm.toLowerCase());
      return matchesCity && matchesGov;
    });
  }
  onCitySearchInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.onCitySearchChange(input.value);
}
toggleCityStatus(city: City): void {
  this.cityService.toggleCityStatusByName(city.name).subscribe({
    next: (response) => {
      city.isActive = response.isActive;
    },
    error: err => console.error(err)
  });
}
editcity(city: CityDTO): void {
  this.cityService.selectedCity = city;
  this.router.navigate(['/edit-city']);
}
addcity(): void {
  this.router.navigate(['/add-city']);
}

onGovernorateSearchInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.onGovernorateSearchChange(input.value);
}

  onCitySearchChange(city:string){
    this.citySearchTerm = city;
    this.filterCities();


  }
  onGovernorateSearchChange(governorate:string){
    this.governorateSearchTerm = governorate;
    this.filterCities();
  }}






