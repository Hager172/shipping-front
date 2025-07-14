import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPriceService } from '../../services/custom-price.service';
import { CityService } from '../../services/city.service';
import { TraderService } from '../../services/trader.service';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { FilterPipe } from '../../shared/filter.pipe';

@Component({
  selector: 'app-add-custom-price',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomTableComponent,
    SharedModalComponent,
    ButtonStyleComponent,
    FilterPipe
  ],
  templateUrl: './add-custom-price.component.html',
  styleUrl: './add-custom-price.component.css'
})
export class AddCustomPriceComponent implements OnInit {
  customPrices: any[] = [];
  searchTerm: string = '';
  showModal = false;
  selectedCustomPrice: any = null;

  traders: any[] = [];
  cities: any[] = [];

  formData: any = {
    traderId: '',
    cityId: '',
    price: null,
    isActive: true
  };

  columns = [
    { accessor: 'index', header: '#' },
    { accessor: 'traderName', header: 'Trader Name' },
    { accessor: 'cityName', header: 'City' },
    { accessor: 'price', header: 'Price' },
    { accessor: 'isActive', header: 'Status', type: 'toggle' }
  ];

  constructor(
    private customPriceService: CustomPriceService,
    private cityService: CityService,
    private traderService: TraderService
  ) {}

  ngOnInit(): void {
    this.loadPrices();
    this.loadTraders();
    this.loadCities();
  }

  loadPrices() {
    this.customPriceService.getCustomPrices().subscribe((res: any[]) => {
      this.customPrices = res.map((item, index) => ({ ...item, index: index + 1 }));
      console.log('Custom Prices:', this.customPrices);
    });
  }

  loadTraders() {
    this.traderService.getTraders().subscribe((res: any[]) => {
      this.traders = res;
    });
  }

  loadCities() {
    this.cityService.getAllCities().subscribe((res: any[]) => {
      this.cities = res;
    });
  }

  openModal() {
    this.selectedCustomPrice = null;
    this.formData = {
      traderId: '',
      cityId: '',
      price: null,
      isActive: true
    };
    this.showModal = true;
  }

  editCustomPrice(row: any) {
    this.selectedCustomPrice = row;
    const trader = this.traders.find(t => t.fullName === row.traderName);
    const city = this.cities.find(c => c.name === row.cityName);

    this.formData = {
      traderId: trader?.userId || '',
      cityId: city?.id || '',
      price: row.price,
      isActive: row.isActive
    };
    this.showModal = true;
  }

  deleteCustomPrice(row: any) {
    if (confirm('Are you sure you want to delete this custom price?')) {
      this.customPriceService.deleteCustomPrice(row.id).subscribe(() => {
        this.loadPrices();
      });
    }
  }

  toggleStatus(row: any) {
    const updated = { ...row, isActive: !row.isActive };
    this.customPriceService.updateCustomPrice(row.id, updated).subscribe(() => {
      row.isActive = updated.isActive;
    });
  }

  closeModal(refresh: boolean) {
    this.showModal = false;
    if (refresh) this.loadPrices();
  }

  submitForm() {
  const exists = this.customPrices.find(p =>
    p.traderId === this.formData.traderId &&
    Number(p.cityId) === Number(this.formData.cityId)
  );

  if (
    exists &&
    (!this.selectedCustomPrice || exists.id !== this.selectedCustomPrice.id)
  ) {
    alert('Custom price for this trader and city already exists.');
    return;
  }

  if (this.selectedCustomPrice) {
    this.customPriceService
      .updateCustomPrice(this.selectedCustomPrice.id, this.formData)
      .subscribe(() => {
        this.closeModal(true);
      });
  } else {
    this.customPriceService.createCustomPrice(this.formData).subscribe(() => {
      this.closeModal(true);
    });
  }
}

}
