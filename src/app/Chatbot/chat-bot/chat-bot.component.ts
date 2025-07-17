import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-bot',
  imports : [CommonModule , FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  question = '';
  answer = '';
  loading = false;
  showChat = false; 

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.showChat = !this.showChat;
  }

  ask() {
    if (!this.question.trim()) {
      alert('Please enter a question');
      return;
    }

    this.loading = true;
    this.answer = '';

    this.http.post<any>(`${environment.baseUrl}chatbot/ask`, {
      question: this.question
    }).subscribe({
      next: (res) => {
        this.answer = res.response;
        this.loading = false;
      },
      error: () => {
        this.answer = 'Error contacting the server.';
        this.loading = false;
      }
    });
  }
}
