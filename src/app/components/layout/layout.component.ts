import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { ChatBotComponent } from "../../Chatbot/chat-bot/chat-bot.component";

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, SidebarComponent, RouterModule, ChatBotComponent], 
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
