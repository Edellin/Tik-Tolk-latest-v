import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';

import {ImgUrlPipe} from "../../../../../common-ui/src/lib/pipes";
import { Profile } from '@tt/data-access';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {EMPTY} from "rxjs";
import {selectFilteredProfiles} from "@tt/profile";



@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
  router = inject(Router);
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  async sendMessage(userId: number) {
    await this.router.navigate(['/chats', 'new'], {queryParams: {userId}});
  }


  protected readonly EMPTY = EMPTY;
}
