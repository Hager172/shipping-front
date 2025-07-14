import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TraderService } from '../../services/trader.service';
import { GovernrateService } from '../../services/governrate.service';
import { CityService } from '../../services/city.service';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';

@Component({
  selector: 'app-edit-trader',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonStyleComponent],
  templateUrl: './edit-trader.component.html',
  styleUrls: ['./edit-trader.component.css']
})
export class EditTraderComponent implements OnInit {
  traderId!: string;
  formData: any = {
    email: '',
    fullName: '',
    address: '',
    phone: '',
    storeName: '',
    branchId: 0,
    governorateId: 0,
    cityId: 0,
    customPickupCost: 0,
    rejectedOrderShippingShare: 0,
    isActive: true,
    password: ''
  };

  governorates: any[] = [];
  cities: any[] = [];
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private traderService: TraderService,
    private govService: GovernrateService,
    private cityService: CityService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.traderId = this.route.snapshot.params['id'];
    this.loadTrader();
    this.loadGovernorates();
    this.loadBranches();
  }


  loadTrader() {
  this.traderService.getTraderById(this.traderId).subscribe({
    next: (res: any) => {
      this.formData = { ...res, password: '' };
      this.loadCitiesByGov(res.governorateId);
      this.formData.governorateId = res.governorateId;
      this.formData.cityId = res.cityId;
    },
    error: () => alert('Failed to load trader data.')
  });
}


  loadGovernorates() {
    this.govService.getAll().subscribe((res: any[]) => {
      this.governorates = res;
    });
  }

  loadCitiesByGov(governorateId: number) {
    this.cityService.getCitiesByGovernorate(governorateId).subscribe((res: any[]) => {
      this.cities = res;
    });
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe((res: any[]) => {
      this.branches = res;
    });
  }

  onGovernorateChange(govId: number) {
    this.loadCitiesByGov(govId);
    this.formData.cityId = 0;
  }

  save() {
    this.traderService.updateTrader(this.traderId, this.formData).subscribe({
      next: () => {
        alert('Trader updated successfully!');
        this.router.navigate(['/traders']);
      },
      error: () => alert('Failed to update trader.')
    });
  }
}
