import { Component, OnInit } from '@angular/core';
import { BranchDTO } from '../../../models/branch/branch';
import { BranchService } from '../../../services/branch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {
   branches: BranchDTO[] = [];
  filtered: BranchDTO[] = [];
  nameSearchTerm = '';
  citySearchTerm = '';

  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe((data: BranchDTO[]) => {
      this.branches = data;
      this.filtered = data;
      console.log('Branches loaded:', data);
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
