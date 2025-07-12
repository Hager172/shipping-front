import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table-without-action',
   imports: [CommonModule, FormsModule],
  templateUrl: './custom-table-without-action.component.html',
  styleUrl: './custom-table-without-action.component.css'
})
export class CustomTableWithoutActionComponent {
 @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() itemsPerPage = 10;
   @Output() onToggleStatus = new EventEmitter<any>();
  currentPage = 1;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.data.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

}
