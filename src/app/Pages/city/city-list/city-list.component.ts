import { Component, OnInit } from '@angular/core';
import { City, CityDTO } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
declare var bootstrap: any;

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
  deleteModal: any;
  errormessage:string='';
  selectedCity:CityDTO|null=null;
  citySearchTerm = '';
  governorateSearchTerm = '';
  ngOnInit(): void {
     this.loadCities();
      const modalEl = document.getElementById('deleteConfirmModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
    }
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
  }
  deleteCity(city: CityDTO): void {
    this.selectedCity = city;
    this.deleteModal.show(); // عرض المودال
    console.log(this.selectedCity);
  }

  confirmDeleteCity(): void {
    this.errormessage = '';
    if (!this.selectedCity) return;

    this.cityService.deleteCity(this.selectedCity.id).subscribe({
      next: () => {
        this.filtered = this.filtered.filter(
          (c) => c.id !== this.selectedCity?.id
        );
        this.deleteModal.hide();
        this.errormessage = 'city deleted successfully';

        setTimeout(() => {
          this.errormessage = '';
        }, 2000);
      },
      error: (err) => {
        this.errormessage = err.error;
        setTimeout(() => {
          this.errormessage = '';
        }, 2000);

        console.error('Error deleting city', err.error);
        this.deleteModal.hide();
      },
    });
  }

}






