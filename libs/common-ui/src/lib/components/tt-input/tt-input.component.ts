import {Component, forwardRef, input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent)
    }
  ]
})
export class TtInputComponent implements ControlValueAccessor {

  type = input<'text' | 'password'>('text');
  placeholder = input<string>('text');

  onChang: any
  onTouched: any


  value: string | null = ''

  writeValue(val: string | null) {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChang = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }

  onModelChange(val: string | null): void {
     this.onChang(val);
  }
}
