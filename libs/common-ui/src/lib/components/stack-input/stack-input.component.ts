import {Component, forwardRef, HostListener, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SvgIconComponent} from "../svg-icon/svg-icon.components.ts/svg-icon.component";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'tt-stack-input',
  imports: [CommonModule, FormsModule, SvgIconComponent],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => StackInputComponent),
  }]
})
export class StackInputComponent implements ControlValueAccessor {

  value$ = new BehaviorSubject<string[]>([])

  innerInput = ''

  @HostListener('keydown.enter')
  onEnter() {
    if (!this.innerInput) return

    this.value$.next([...this.value$.value, this.innerInput])
    this.innerInput = ''
    this.onChange(this.value$.value)
    }

    writeValue(stack: string[] | null): void {
      if (!stack) {
        this.value$.next([])
        return
      }

      this.value$.next(stack)
    }

    registerOnChange(fn: any): void {
      this.onChange = fn
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn
    }

    setDisabledState?(isDisabled: boolean): void {

    }

  onChange(value: string[] | null) {

  }

  onTouched() {

  }

  onTagDelete(i: number) {
    const tags = this.value$.value
    tags.splice(i, 1)
    this.value$.next(tags)
    this.onChange(this.value$.value)
  }

}
