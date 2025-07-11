import { Component, OnInit } from '@angular/core';
import { GovernorateDTO } from '../../../models/governrate/governrate';
import { GovernrateService } from '../../../services/governrate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-govern-list',
  imports: [CommonModule],
  templateUrl: './govern-list.component.html',
  styleUrl: './govern-list.component.css'
})
export class GovernListComponent implements OnInit {
governorates: GovernorateDTO[] = [];
  filteredGovernorates: GovernorateDTO[] = [];

  errorMessage: string = '';

  constructor(private govService: GovernrateService, private router: Router) {}

  ngOnInit(): void {
    this.loadGovernorates();
  }

  loadGovernorates() {
    this.govService.getAll().subscribe({
      next: (data) => {
        this.governorates = data;
        this.filteredGovernorates = data;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to load governorates.';
      }
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGovernorates = this.governorates.filter((g) =>
      g.name.toLowerCase().includes(value)
    );
  }

  addGovernorate() {
    this.router.navigate(['/add-governorate']);
  }

  editGovernorate(governorate: GovernorateDTO) {
  this.govService.selectedGovernorate = governorate;
    this.router.navigate(['/edit-governorate']);
  }
}
