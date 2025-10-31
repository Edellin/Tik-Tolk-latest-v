import { Routes } from '@angular/router';
import { canActivateAuth } from "libs/auth/src/lib/auth/access.guard";
import { LoginPageComponent } from "libs/auth/src/lib/feature-login/login-page/login-page.component";
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from 'libs/layout/src/lib/layout/layout.component';
import { ProfilePageComponent } from 'libs/profile/src/lib/feature-profile-page';
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {FormComponent} from "@tt/form";
import {postFeature} from "@tt/posts";
import {PostEffects} from "@tt/posts";
import {ProfileEffects, SearchPageComponent} from "@tt/profile";
import {profileFeature} from "@tt/profile";

import {SettingsPageComponent} from "libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component"

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(postFeature),
          provideEffects(PostEffects)
        ]
      },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'form', component: FormComponent},
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
