import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { profileActions } from '../../date/store';
import { ProfileService } from '@tt/data-access';

@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private profileService = inject(ProfileService);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  private searchFormSub?: Subscription;

  ngOnInit() {
    const savedFilters = localStorage.getItem('profileFilters');
    if (savedFilters) {
      try {
        this.searchForm.patchValue(JSON.parse(savedFilters));
      } catch {
        localStorage.removeItem('profileFilters');
      }
    }


    this.searchFormSub = this.searchForm.valueChanges
      .pipe(debounceTime(300), startWith(this.searchForm.value))
      .subscribe(formValue => {
        localStorage.setItem('profileFilters', JSON.stringify(formValue));

        this.store.dispatch(profileActions.filterEvents({ filters: formValue }));
      });
  }

  ngOnDestroy() {
    this.searchFormSub?.unsubscribe();
  }
}
