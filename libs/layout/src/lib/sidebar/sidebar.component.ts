import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {SvgIconComnonent} from '@tt/common-ui';
import {ProfileService} from '@tt/profile';
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {ImgUrlPipe} from "../../../../common-ui/src/lib/pipes";

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComnonent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: '/chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
