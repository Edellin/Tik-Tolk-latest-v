import {Profile} from '@tt/interfaces/profile';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion?: Profile;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createAt: string;
  idRead: boolean;
  updateAt: string;
  user?: Profile;
  isMine?: boolean;
}

export interface LastMessageResponse {
  id: number;
  userFrom: Profile;
  message: string | null;
}
