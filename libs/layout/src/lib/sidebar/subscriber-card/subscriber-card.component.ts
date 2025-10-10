import { Component, Input } from '@angular/core';
import {Profile} from '@tt/interfaces/profile';
import {ImgUrlPipe} from "../../../../../common-ui/src/lib/pipes";




@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  standalone: true,
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
