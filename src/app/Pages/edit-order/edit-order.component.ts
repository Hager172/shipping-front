import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { GovernrateService } from '../../services/governrate.service';
import { CityService } from '../../services/city.service';
import { TraderService } from '../../services/trader.service';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { ShippingTypesService } from '../../services/shipping-types.service';
import { OrderItemService } from '../../services/order-item.service';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonStyleComponent],
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: any = { items: [] };
  newItem: any = { productName: '', quantity: 1, weight: 0 };
  governorates: any[] = [];
  cities: any[] = [];
  traders: any[] = [];
  branches: any[] = [];

  paymentTypes = [
    { value: 1, label: 'Collect On Delivery' },
    { value: 2, label: 'Prepaid' },
    {value:3 , label:'Exchange Package'}
  ];
  deliveryTypes = [
    { value: 1,label: 'At Branch'},           
    { value: 2, label: 'From Merchant' }
  ];

  statuses = [
    { value: 1,label: 'New'},           
    { value: 2, label: 'Pending' },
    { value: 3,label: 'Delivered To Courier'},            
    { value: 4, label: 'Delivered' },
    { value: 5,label: 'Not Reachable'},            
    { value: 6, label: 'Postponed' },
    { value: 7,label: 'Partially Delivered'},            
    { value: 8, label: 'Cancelled By Recipient' },
    { value: 9,label: 'Rejected With Payment'},            
    { value: 10, label: 'Rejected With Partial Payment' },
    { value: 11,label: 'Rejected Without Payment'}
  ];
  shippingTypes: any[] = [];

  orderId!: number;

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
    this.loadOrder();
  }

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private govService: GovernrateService,
    private cityService: CityService,
    private traderService: TraderService,
    private branchService: BranchService,
    private shippingTypeService : ShippingTypesService,
    private orderItemService: OrderItemService,
    private router: Router
  ) {}

  loadData() {
    this.govService.getAll().subscribe(g => this.governorates = g);
    this.cityService.getAllCities().subscribe(c => this.cities = c);
    this.traderService.getTraders().subscribe(t => this.traders = t);
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
    this.shippingTypeService.getAllShippingTypes().subscribe(s=>this.shippingTypes = s);
  }

  loadOrder() {
  this.orderService.getOrderById(this.orderId).subscribe({
    next: (o: any) => {
      this.order = { ...o, items: [] };
      this.loadOrderItems(); 
    },
    error: () => alert('Failed to load order')
  });
}
loadOrderItems() {
  console.log(this.orderId);
  this.orderItemService.getOrderItems(this.orderId).subscribe({
    next: (items: any[]) => {
      this.order.items = items ?? [];
    },
    error: () => alert('This Order has no Order Items')
    // error: () => alert('Failed to load order items')
  });
}


  handleSelectionChange(field: string, value: any) {
    this.order[field] = parseInt(value, 10);
  }

  addItem() {
    if (this.newItem.productName) {
      this.order.items.push({ ...this.newItem });
      this.newItem = { productName: '', quantity: 0, weight: 0 };
    }
  }

  removeItem(idx: number) {
    this.order.items.splice(idx, 1);
  }

  submitOrder() {
    this.order.rejectionReasonId = null
    this.orderService.updateOrder(this.orderId, this.order).subscribe({
      next: () => {
        alert('Order updated successfully');
        this.router.navigate(['/orders']);
      },
      error: () => alert('An Error Occured, Please Try again')
    });
  }
  
}
