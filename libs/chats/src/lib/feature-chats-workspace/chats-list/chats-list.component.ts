import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import {ChatsBtnComponent} from "@tt/chats";
import {ChatsService, isNewMessage} from "@tt/data-access";


@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);
  chatService = inject(ChatsService)
  unreadMessages = this.chatService.unreadMessagesCount;


  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes(inputValue ?? '');
          });
        })
      );
    })
  )
  protected readonly isNewMessage = isNewMessage;
}
