import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bank } from '../../models/Banks/bank.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-bank-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-bank-modal.component.html',
  styleUrls: ['./edit-bank-modal.component.css']
})
export class EditBankModalComponent {
  @Input() bank: Bank | null = null;
  @Input() show: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Bank>();

  saveChanges() {
    if (this.bank) {
      this.onSave.emit(this.bank);
      this.onClose.emit();
    }
  }

  closeModal() {
    this.onClose.emit();
  }
}
