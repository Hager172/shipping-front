import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeMenu: string | null = null;
   isCollapsed = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  toggleMenu(menuId: string) {
    if (this.activeMenu === menuId) {
      this.activeMenu = null;
    } else {
      this.activeMenu = menuId;
    }
  }

  isMenuOpen(menuId: string): boolean {
    return this.activeMenu === menuId;
  }
}
