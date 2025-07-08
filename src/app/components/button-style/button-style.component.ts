// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-button-style',
//   imports: [],
//   templateUrl: './button-style.component.html',
//   styleUrl: './button-style.component.css'
// })
// export class ButtonStyleComponent {

// }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-style',
  standalone: true,
  templateUrl: './button-style.component.html',
  styleUrls: ['./button-style.component.css']
})
export class ButtonStyleComponent {
  @Input() label: string = 'Button';
  @Input() className: string = 'btn btn-primary';
  @Input() onClick: () => void = () => {};
}
