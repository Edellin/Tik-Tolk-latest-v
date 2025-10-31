import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "@tt/data-access";
import {TtInputComponent} from "@tt/common-ui";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef)

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit() {
    if (this.form.value) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['']);
        console.log(res);
      });
    }
  }
}
