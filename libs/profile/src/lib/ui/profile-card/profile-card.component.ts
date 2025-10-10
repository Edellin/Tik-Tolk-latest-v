import { Component, Input } from '@angular/core';
import {Profile} from '@tt/interfaces/profile';
import {ImgUrlPipe} from "../../../../../common-ui/src/lib/pipes";


@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  standalone: true,
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
