import { Routes } from '@angular/router';
import ChatWorkspaceComponent from '../chat-workspace/chat-workspace.component';
import {ChatsPageComponent} from "@tt/chats";

export const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
