import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeMenu: string | null = null;
  isCollapsed = false;
  userRole = '';

  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private authService : AuthService){ this.ngOnInit()}
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }
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
