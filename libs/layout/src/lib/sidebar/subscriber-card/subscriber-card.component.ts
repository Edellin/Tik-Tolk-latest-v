import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ImgUrlPipe} from "../../../../../common-ui/src/lib/pipes";
import {Profile} from "@tt/data-access";




@Component({
  standalone: true,
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
