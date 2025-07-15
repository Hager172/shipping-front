import { Component, OnInit } from '@angular/core';
import { GovernorateDTO } from '../../../models/governrate/governrate';
import { GovernrateService } from '../../../services/governrate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-govern-list',
  imports: [CommonModule],
  templateUrl: './govern-list.component.html',
  styleUrl: './govern-list.component.css'
})
export class GovernListComponent implements OnInit {
  governorates: GovernorateDTO[] = [];
  filteredGovernorates: GovernorateDTO[] = [];
  selectedGovernorate?: GovernorateDTO;
  deleteModal: any;
  errorMessage: string = '';

  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number[] = [];

  constructor(private govService: GovernrateService, private router: Router) {}

 ngOnInit(): void {
    this.loadGovernorates();
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }
  }

  loadGovernorates() {
    this.govService.getAll().subscribe({
      next: (data) => {
        this.governorates = data;
        this.filteredGovernorates = data;
        this.generatePages();
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
    this.currentPage = 1;
    this.generatePages();
  }

  get pagedGovernorates(): GovernorateDTO[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredGovernorates.slice(start, end);
  }

  generatePages(): void {
    const pageCount = Math.ceil(this.filteredGovernorates.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  addGovernorate() {
    this.router.navigate(['/add-governorate']);
  }

  editGovernorate(governorate: GovernorateDTO) {
    this.govService.selectedGovernorate = governorate;
    this.router.navigate(['/edit-governorate']);
  }

  deleteGovernorate(governorate: GovernorateDTO): void {
    this.selectedGovernorate = governorate;
    this.deleteModal.show();
  }

  confirmDeleteGovernorate(): void {
    this.errorMessage = '';
    if (!this.selectedGovernorate) return;

    this.govService.delete(this.selectedGovernorate.id).subscribe({
      next: () => {
        this.filteredGovernorates = this.filteredGovernorates.filter(
          (g) => g.id !== this.selectedGovernorate?.id
        );
        this.governorates = this.governorates.filter(
          (g) => g.id !== this.selectedGovernorate?.id
        );
        this.generatePages();
        this.currentPage = 1;
        this.deleteModal.hide();
        this.errorMessage = 'Governorate deleted successfully';

        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Error deleting governorate';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
        this.deleteModal.hide();
      },
    });
  }
}
