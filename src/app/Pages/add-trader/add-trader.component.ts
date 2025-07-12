import { Component, OnInit } from '@angular/core';
import { TraderService } from '../../services/trader.service';
import { GovernrateService } from '../../services/governrate.service';
import { CityService } from '../../services/city.service';
import { BranchService } from '../../services/branch.service';
import { CustomPriceService } from '../../services/custom-price.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';

@Component({
  selector: 'app-add-trader',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonStyleComponent],
  templateUrl: './add-trader.component.html',
  styleUrls: ['./add-trader.component.css']
})
export class AddTraderComponent implements OnInit {
  constructor(
    private traderService: TraderService,
    private governrateService: GovernrateService,
    private cityService: CityService,
    private branchService: BranchService,
    private customPriceService: CustomPriceService
  ) {}

  trader = {
    fullName: '',
    email: '',
    storeName: '',
    address: '',
    password: '',
    phone: '',
    governorateId: 0,
    cityId: 0,
    branchId: 0,
    customPickupCost: 0,
    rejectedOrderShippingShare: 0
  };

  cp = {
    price: 0,
    traderId: '',
    cityId: 0,
    isActive: true
  }

  cpGovernorateId: number = 0;

  customPrices: any[] = [];
  governorates: any[] = [];
  cities: any[] = [];
  filteredCitiesForTrader: any[] = [];
  filteredCitiesForCP: any[] = [];
  branches: any[] = [];
  validationErrors: any = {};

  ngOnInit() {
    this.loadGovernorates();
    this.loadBranches();
  }

  loadGovernorates() {
    this.governrateService.getAll().subscribe(
      data => this.governorates = data,
      error => console.error('Error loading governorates', error)
    );
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe(
      data => this.branches = data,
      error => console.error('Error loading branches', error)
    );
  }

  filterCitiesForTrader(governorateId: number) {
    this.cityService.getCitiesByGovernorate(governorateId).subscribe(
      (data) => {
        this.filteredCitiesForTrader = data;
        this.trader.cityId = 0;
      },
      (error) => {
        console.error('Error filtering cities for trader', error);
        this.filteredCitiesForTrader = [];
      }
    );
  }

  filterCitiesForCP(governorateId: number) {
    this.cityService.getCitiesByGovernorate(governorateId).subscribe(
      (data) => {
        this.filteredCitiesForCP = data;
        this.cp.cityId = 0;
      },
      (error) => {
        console.error('Error filtering cities for custom price', error);
        this.filteredCitiesForCP = [];
      }
    );
  }

  addCustomPrice() {
    const newPrice = { ...this.cp };
    this.customPrices.push(newPrice);
    this.cp = { price: 0, traderId: '', cityId: 0, isActive: true };
    this.cpGovernorateId = 0;
    this.filteredCitiesForCP = [];
  }

  removeCustomPrice(index: number) {
    this.customPrices.splice(index, 1);
  }

  addTrader() {
    this.traderService.createTrader(this.trader).subscribe(
      (res: any) => {
        const traderId = res.traderId || res.id;
        if (this.customPrices.length > 0) {
          this.customPrices.forEach(cp => cp.traderId = traderId);
          this.customPriceService.createBulkCustomPrices(this.customPrices).subscribe(
            () => console.log('Custom prices saved!'),
            err => console.error('Error saving custom prices', err)
          );
        }
        alert("Trader added successfully!");
        this.resetForm();
      },
      error => {
        console.error('Error adding trader', error);
        if (error.status === 400 && error.error?.errors) {
          this.validationErrors = error.error.errors;
        } else {
          alert("Unexpected error occurred.");
        }
      }
    );
  }

  resetForm() {
    this.trader = {
      fullName: '',
      email: '',
      storeName: '',
      address: '',
      password: '',
      phone: '',
      governorateId: 0,
      cityId: 0,
      branchId: 0,
      customPickupCost: 0,
      rejectedOrderShippingShare: 0
    };
    this.customPrices = [];
    this.cp = { price: 0, traderId: '', cityId: 0, isActive: true };
    this.cpGovernorateId = 0;
    this.filteredCitiesForTrader = [];
    this.filteredCitiesForCP = [];
    this.validationErrors = {};
  }
}
