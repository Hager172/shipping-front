import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css']
})
export class SharedModalComponent {
  @Input() title: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<void>();
}
