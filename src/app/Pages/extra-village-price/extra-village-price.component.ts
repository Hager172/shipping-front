// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ExtraVillagePriceService } from '../../services/extra-village-price.service';

// @Component({
//   selector: 'app-extra-village-price',
//   imports: [CommonModule , ReactiveFormsModule , FormsModule],
//   templateUrl: './extra-village-price.component.html',
//   styleUrl: './extra-village-price.component.css'
// })
// export class ExtraVillagePriceComponent {

//   constructor(private extraVillagePriceService: ExtraVillagePriceService) { 
//     // Initialization logic can go here
//   }

//   getExtraVillagePriceById(id: number) {
//     this.extraVillagePriceService.getExtraVillagePriceById(id).subscribe(
//       response => {
//         console.log('Extra Village Price:', response);
//       },
//       error => {
//         console.error('Error fetching Extra Village Price:', error);
//       }
//     );
//   }

//   getExtraVillagePrices() {
//     this.extraVillagePriceService.getExtraVillagePrices().subscribe(
//       response => {
//         console.log('All Extra Village Prices:', response);
//       },
//       error => {
//         console.error('Error fetching Extra Village Prices:', error);
//       }
//     );
//   }

//   createExtraVillagePrice(extraVillagePrice: any) {
//     this.extraVillagePriceService.createExtraVillagePrice(extraVillagePrice).subscribe(
//       response => {
//         console.log('Extra Village Price created:', response);
//       },
//       error => {
//         console.error('Error creating Extra Village Price:', error);
//       }
//     );
//   }

//   updateExtraVillagePrice(id: number, extraVillagePrice: any) {
//     this.extraVillagePriceService.updateExtraVillagePrice(id, extraVillagePrice).subscribe(
//       response => {
//         console.log('Extra Village Price updated:', response);
//       },
//       error => {
//         console.error('Error updating Extra Village Price:', error);
//       }
//     );
//   }

//   deleteExtraVillagePrice(id: number) {
//     this.extraVillagePriceService.deleteExtraVillagePrice(id).subscribe(
//       response => {
//         console.log('Extra Village Price deleted:', response);
//       },
//       error => {
//         console.error('Error deleting Extra Village Price:', error);
//       }
//     );
//   }



// }



import { Component } from '@angular/core';
import { ExtraVillagePriceService } from '../../services/extra-village-price.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';

@Component({
  selector: 'app-extra-village-price',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    CustomTableComponent,
    ButtonStyleComponent,
    SharedModalComponent
  ],
  templateUrl: './extra-village-price.component.html',
  styleUrls: ['./extra-village-price.component.css']
})
export class ExtraVillagePriceComponent {
  prices: any[] = [];
  searchTerm: string = '';
  showModal = false;
  isEditMode = false;
  modalPrice: any = { value: 0, isActive: false };
  toBeDeleted: any = null;
  confirmDeleteModal = false;

  constructor(private priceService: ExtraVillagePriceService) {
    this.loadPrices();
  }

  columns = [
    { header: '#', accessor: 'index' },
    { header: 'Value', accessor: 'value' },
    { header: 'Status', accessor: 'isActive', type: 'toggle' },
    { header: 'Actions', accessor: 'actions', type: 'actions' }
  ];

  loadPrices() {
    this.priceService.getExtraVillagePrices().subscribe({
      next: (res) => {
        this.prices = res.map((p, index) => ({
          ...p,
          index: index + 1 // لإظهار الترتيب
        }));
      },
      error: (err) => {
        console.error('Error loading prices:', err);
        alert('Failed to load prices');
      }
    });
  }

  openAddModal() {
    this.modalPrice = { value: 0, isActive: false };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(price: any) {
    this.modalPrice = { ...price };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  savePrice() {
    if (this.isEditMode) {
      this.priceService.updateExtraVillagePrice(this.modalPrice.id, this.modalPrice).subscribe({
        next: () => {
          this.loadPrices();
          this.showModal = false;
        },
        error: (err) => {
          console.error(err);
          alert(err.error);
        }
      });
    } else {
      this.priceService.createExtraVillagePrice(this.modalPrice).subscribe({
        next: () => {
          this.loadPrices();
          this.showModal = false;
        },
        error: (err) => {
          console.error(err);
          alert(err.error);
        }
      });
    }
  }

  confirmDelete(price: any) {
    this.toBeDeleted = price;
    this.confirmDeleteModal = true;
  }

  deleteConfirmed() {
    if (this.toBeDeleted) {
      this.priceService.deleteExtraVillagePrice(this.toBeDeleted.id).subscribe({
        next: () => {
          this.loadPrices();
          this.confirmDeleteModal = false;
        },
        error: (err) => {
          console.error(err);
          alert(err.error);
        }
      });
    }
  }

  // onToggleStatus(price: any) {
  //   const updated = { ...price, isActive: !price.isActive };
  //   this.priceService.updateExtraVillagePrice(price.id, updated).subscribe({
  //     next: () => this.loadPrices(),
  //     error: (err) => {
  //       console.error(err);
  //       alert(err.error);
  //     }
  //   });
  // }
  onToggleStatus(row: any) {
  const updated = { ...row, isActive: row.isActive }; // القيمة بقت اتعدلت خلاص من ngModel
  this.priceService.updateExtraVillagePrice(row.id, updated).subscribe({
    next: () => this.loadPrices(),
    error: (err) => {
      console.error(err);
      alert(err.error); // علشان الرسالة توصل للمستخدم
      this.loadPrices(); // نرجّع البيانات تاني لو حصل فشل
    }
  });
}

}
