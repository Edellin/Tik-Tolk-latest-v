import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import { ProfileCardComponent, ProfileFiltersComponent} from "@tt/profile";
import {InfiniteScrollTriggerComponent} from "@tt/common-ui";
import {profileActions, selectFilteredProfiles} from "../store";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {

  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }
}
