import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom, Subscription, timer} from 'rxjs';
import {ImgUrlPipe} from "@tt/common-ui";
import {SvgIconComponent} from 'libs/common-ui/src/lib/components';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ChatsService, isErrorMessages, ProfileService} from "@tt/data-access";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  chatService = inject(ChatsService)
  unreadMessages = this.chatService.unreadMessagesCount
  destroyRef = inject(DestroyRef)

  wsSubscribe!: Subscription

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
    {
      label: 'Форма',
      icon: 'form',
      link: 'form',
    },
  ];

  async reconnect(){
    console.log('reconnecting...');
    await firstValueFrom(this.profileService.getMe());
    await firstValueFrom(timer(2000));
    this.connectWs()
  }

  connectWs(): void {
    this.wsSubscribe?.unsubscribe()
    this.wsSubscribe = this.chatService
      .connectWs()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
    .subscribe((message) => {
      if (isErrorMessages(message)) {
      console.log('Неверный токен')
        this.reconnect()
      }
    })
  }



  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.connectWs()
  }
}
