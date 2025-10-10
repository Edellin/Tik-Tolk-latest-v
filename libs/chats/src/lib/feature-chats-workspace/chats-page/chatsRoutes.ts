import { Routes } from '@angular/router';
import {ChatsPageComponent, ChatWorkspaceComponent} from '@tt/chats';

export const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
