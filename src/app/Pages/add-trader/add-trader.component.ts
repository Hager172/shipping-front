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
  imports: [CommonModule , FormsModule , ReactiveFormsModule , ButtonStyleComponent],
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

  customPrices: any[] = [];
  governorates: any[] = [];
  cities: any[] = [];
  branches: any[] = [];
  filteredCities: any[] = [];

  ngOnInit() {
    this.loadGovernorates();
    this.loadCities();
    this.loadBranches();
  }

  loadGovernorates() {
    this.governrateService.getAll().subscribe(
      data => {
        this.governorates = data;
      },
      error => console.error('Error loading governorates', error)
    );
  }

  loadCities() {
    this.cityService.getAllCities().subscribe(
      data => this.cities = data,
      error => console.error('Error loading cities', error)
    );
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe(
      data => this.branches = data,
      error => console.error('Error loading branches', error)
    );
  }

  filterCities(governorateId: number) {
    this.filteredCities = this.cities.filter(c => c.governorateId === governorateId);
  }

  addCustomPrice() {
    const newPrice = { ...this.cp };
    this.customPrices.push(newPrice);
    this.cp = { price: 0, traderId: '', cityId: 0, isActive: true };
  }

  removeCustomPrice(index: number) {
    this.customPrices.splice(index, 1);
  }

  addTrader() {
    this.traderService.createTrader(this.trader).subscribe(
      (res: any) => {
        const traderId = res.id || res.traderId;
        if (this.customPrices.length > 0) {
          this.customPrices.forEach(cp => cp.traderId = traderId);
          this.customPriceService.createBulkCustomPrices(this.customPrices).subscribe(
            () => console.log('Custom prices saved!'),
            err => console.error('Error saving custom prices', err)
          );
        }
        this.resetForm();
      },
      error => {
        console.error('Error adding trader', error);
        alert("Error occurred while adding trader. Check console for details.");
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
  }
}
