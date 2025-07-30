import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ChatBotComponent } from "./Chatbot/chat-bot/chat-bot.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shipping-dashboard';
}
