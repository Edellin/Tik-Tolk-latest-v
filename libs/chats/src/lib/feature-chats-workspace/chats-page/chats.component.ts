import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatsListComponent} from '@tt/chats';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  standalone: true,
})
export class ChatsPageComponent {}
