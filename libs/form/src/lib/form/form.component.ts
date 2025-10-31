import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup, FormRecord,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MockService} from "@tt/form";
import {Feature} from "./mock.service"

enum ReciverType {
  PERSON = "PERSON",
  LEGAL = "LEGAL",
}

interface Address {
  city?: string,
  street?: string,
  building?: number,
  apartment?: number
}

function getAddressForm () {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  })
}

function validateStartWith(farbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(farbiddenLetter)
      ? {startsWith: {message:`${farbiddenLetter} - последняя буква`}}
      : null
  }
}

function validateDateRange({fromControlName, toControlName }: {fromControlName: string, toControlName: string}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName)
    const toControl = control.get(toControlName)

    if (!fromControl || !toControl) return null

    const fromDate = new Date(fromControl.value)
    const toDate = new Date(toControl.value)

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({dateRange: { message: 'Дата начала не может быть позднее даты конца '}})
      return {dateRange: { message: 'Дата начала не может быть позднее даты конца '}}
    }

    return null
  }
}

@Component({
  selector: "app-form",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent{
  ReciverType = ReciverType;

  #fb = inject(FormBuilder)

  ReceiverType = ReciverType

  mockService = inject(MockService)
  features: Feature[] = []

  form = new FormGroup({
    type: new FormControl<ReciverType>(ReciverType.PERSON),
    name: new FormControl<string>('', [Validators.required, validateStartWith('м')]),
    inn: new FormControl<string>(''),
    lastname: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup({
      from: new FormControl<string>(''),
      to: new FormControl<string>('')
    }, validateDateRange({fromControlName: 'from', toControlName: 'to'}))
  })

  constructor() {
    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features

        for (const feature of features) {
          this.form.controls.feature.addControl(feature.code, new FormControl(feature.value))
        }
      })


    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.form.controls.inn.clearValidators()

        if (val === ReciverType.LEGAL) {
          this.form.controls.inn.setValidators(
            [Validators.required, Validators.minLength(10 ), Validators.maxLength(10)]
          );
        }
      })
  }


  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) return

    console.log(this.form.valid);
    console.log(this.form.value);
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false});
  }

  sort = () => 0

}
