import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "@tt/layout";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
