import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  activeMenu: string | null = null;

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
