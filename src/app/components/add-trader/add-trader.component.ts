import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-trader',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-trader.component.html',
  styleUrl: './add-trader.component.css'
})
export class AddTraderComponent {

}
