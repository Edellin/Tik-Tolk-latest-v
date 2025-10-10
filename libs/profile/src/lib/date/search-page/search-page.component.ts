import { Component, inject } from '@angular/core';
import {ProfileCardComponent, ProfileFiltersComponent, ProfileService} from '@tt/profile';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true,
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
