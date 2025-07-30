import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderItemService } from '../../services/order-item.service';
import { GovernrateService } from '../../services/governrate.service';
import { CityService } from '../../services/city.service';
import { TraderService } from '../../services/trader.service';
import { CourierService } from '../../services/courier.service';
import { BranchService } from '../../services/branch.service';
import { ShippingTypesService } from '../../services/shipping-types.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';

@Component({
  selector: 'app-admin-add-order',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ButtonStyleComponent],
  templateUrl: './admin-add-order.component.html',
  styleUrls: ['./admin-add-order.component.css']
})
export class AdminAddOrderComponent implements OnInit {
  @ViewChild('orderForm') orderForm!: NgForm;

  order: any = {
    customerName: '',
    email: '',
    phone1: '',
    phone2: '',
    streetAddress: '',
    deliveryType: 1,
    deliverToVillage: false,
    paymentType: 1,
    shippingTypeId: null,
    totalWeight: 0,
    orderCost: 0,
    notes: '',
    status: 1,
    createdAt: new Date().toISOString(),
    governorateId: null,
    cityId: null,
    branchId: null,
    traderId: null,
    courierId: null,
    rejectionReasonId: null,
    items: []
  };

  newItem: any = {
    productName: '',
    quantity: 0,
    weight: 0
  };

  governorates: any[] = [];
  cities: any[] = [];
  traders: any[] = [];
  couriers: any[] = [];
  branches: any[] = [];
  shippingTypes: any[] = [];

  deliveryTypes = [
    { value: 1, label: 'At Branch' },
    { value: 2, label: 'From Merchant' }
  ];

  paymentTypes = [
    { value: 1, label: 'Collect On Delivery' },
    { value: 2, label: 'Prepaid' },
    { value: 3, label: 'Exchange Package' }
  ];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private govService: GovernrateService,
    private cityService: CityService,
    private traderService: TraderService,
    private courierService: CourierService,
    private branchService: BranchService,
    private shippingTypeService: ShippingTypesService
  ) {}

  ngOnInit(): void {
    this.govService.getAll().subscribe(res => this.governorates = res);
    this.cityService.getAllCities().subscribe(res => this.cities = res);
    this.traderService.getTraders().subscribe(res => this.traders = res);
    this.courierService.getAllCouriers().subscribe(res => this.couriers = res);
    this.branchService.getAllBranches().subscribe(res => this.branches = res);
    this.shippingTypeService.getAllShippingTypes().subscribe(res => this.shippingTypes = res);
  }

  onDeliveryTypeChange(event: any) { this.order.deliveryType = +event.target.value; }
  onPaymentTypeChange(event: any) { this.order.paymentType = +event.target.value; }
  onShippingTypeChange(event: any) { this.order.shippingTypeId = +event.target.value; }
  onGovernorateChange(event: any) { this.order.governorateId = +event.target.value; }
  onCityChange(event: any) { this.order.cityId = +event.target.value; }
  onBranchChange(event: any) { this.order.branchId = +event.target.value; }

  addItem() {
    if (this.newItem.productName && this.newItem.quantity > 0 && this.newItem.weight > 0) {
      this.order.items.push({ ...this.newItem });
      this.newItem = { productName: '', quantity: 0, weight: 0 };
    } else {
      alert('Please fill item details correctly.');
    }
  }

  removeItem(index: number) {
    this.order.items.splice(index, 1);
  }

  submitOrder(): void {
    this.order.courierId = null;
    this.order.rejectionReasonId = null;

    this.orderService.addOrder(this.order).subscribe({
      next: (res: any) => {
        const orderId = res.id;
        if (this.order.items.length > 0) {
          type OrderItem = { productName: string; quantity: number; weight: number; orderId: number };
          const itemsToSend: OrderItem[] = this.order.items.map((item: any): OrderItem => ({
            productName: item.productName,
            quantity: item.quantity,
            weight: item.weight,
            orderId: orderId
          }));

          let completed = 0;

          itemsToSend.forEach((item: OrderItem) => {
            this.orderItemService.addOrderItem(item).subscribe({
              next: () => {
                completed++;
                if (completed === itemsToSend.length) {
                  alert('Order and items added successfully.');
                  this.resetForm();
                  this.router.navigate(['/orders']);
                }
              },
              error: () => alert('Failed to send order items.')
            });
          });
        } else {
          alert('Order added successfully.');
          this.resetForm();
          this.router.navigate(['/orders']);
        }
      },
      error: (err) => {
        console.error('Failed to add order:', err);
        alert('An error occurred while adding the order.');
      }
    });
  }

  resetForm(): void {
  this.order = {
    customerName: '',
    email: '',
    phone1: '',
    phone2: '',
    streetAddress: '',
    deliveryType: 1,
    deliverToVillage: false,
    paymentType: 1,
    shippingTypeId: null,
    totalWeight: 0,
    orderCost: 0,
    notes: '',
    status: 1,
    createdAt: new Date().toISOString(),
    governorateId: null,
    cityId: null,
    branchId: null,
    traderId: null,
    courierId: null,
    rejectionReasonId: null,
    items: []
  };

  this.newItem = {
    productName: '',
    quantity: 0,
    weight: 0
  };

  if (this.orderForm) {
    this.orderForm.resetForm();
  }
}
}