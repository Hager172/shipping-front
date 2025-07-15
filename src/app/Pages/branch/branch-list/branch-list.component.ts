import { Component, OnInit } from '@angular/core';
import { Branch, BranchDTO } from '../../../models/branch/branch';
import { BranchService } from '../../../services/branch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-branch-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {
   branches: BranchDTO[] = [];
  filtered: BranchDTO[] = [];
    selectedBranch: BranchDTO | null = null;
errormessage:string='';
  nameSearchTerm = '';
  citySearchTerm = '';
 deleteModal: any;

  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number[] = [];
  constructor(private branchService: BranchService, private router: Router) {}


  ngOnInit(): void {
    this.loadBranches();

    const modalEl = document.getElementById('deleteConfirmModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
    }
  }

  get pagedBranches(): BranchDTO[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filtered.slice(start, end);
  }

  calculateTotalPages(): void {
    const pages = Math.ceil(this.filtered.length / this.itemsPerPage);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe((data: BranchDTO[]) => {
      this.branches = data;
      this.filtered = data;
      this.calculateTotalPages();
    });
  }

  filterBranches(): void {
    this.filtered = this.branches.filter(branch => {
      const matchesName =
        this.nameSearchTerm === '' || branch.name.toLowerCase().includes(this.nameSearchTerm.toLowerCase());
      const matchesCity =
        this.citySearchTerm === '' || branch.cityName.toLowerCase().includes(this.citySearchTerm.toLowerCase());
      return matchesName && matchesCity;
    });

    this.currentPage = 1;
    this.calculateTotalPages();
  }

  deleteBranch(branch: BranchDTO): void {
    this.selectedBranch = branch;
    this.deleteModal.show();
  }

  confirmDelete(): void {
    this.errormessage = '';
    if (!this.selectedBranch) return;

    this.branchService.deleteBranch(this.selectedBranch.id).subscribe({
      next: () => {
        this.filtered = this.filtered.filter((b) => b.id !== this.selectedBranch?.id);
        this.deleteModal.hide();
        this.errormessage = 'branch deleted successfully';
        setTimeout(() => (this.errormessage = ''), 2000);
      },
      error: (err) => {
        this.errormessage = err.error;
        setTimeout(() => (this.errormessage = ''), 2000);
        this.deleteModal.hide();
      }
    });
  }

  onNameSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nameSearchTerm = input.value;
    this.filterBranches();
  }

  onCitySearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.citySearchTerm = input.value;
    this.filterBranches();
  }

  editBranch(branch: BranchDTO): void {
    this.branchService.selectedBranch = branch;
    this.router.navigate(['/edit-branch']);
  }

  addBranch(): void {
    this.router.navigate(['/add-branch']);
  }
}
