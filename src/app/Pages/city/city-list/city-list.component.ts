import { Component, OnInit } from '@angular/core';
import { City } from '../../../models/city/city.model';
import { CityService } from '../../../services/city.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-list',
  imports: [CommonModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit {
  constructor(private cityService: CityService) { }
  cities : City[] = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cityService.getAllCities().subscribe({
      next:(data)=> {
        this.cities = data;
      },
      error:(err) => {
        console.error('Error fetching cities:', err);
      }
    })
  }



}
