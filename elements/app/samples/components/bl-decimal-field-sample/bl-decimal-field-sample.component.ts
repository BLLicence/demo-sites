import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';
import {ToasterService} from "@bl/shared";

type BlDecimalFormGroup = {
  rate: number | null;
  amountEuro: number | null;
  price: number | null;
  negativeValue: number | null;
  withAddedZeros : number | null;
  amountReadOnly: number | null;
  currency: string | null;
};

enum CurrencyEnum {
  CHF = 'CHF',
  XFP = 'XFP',
  EUR = '€',
  DOLLAR = '$',
  GBP = '£',
}

@Component({
  selector: 'bl-decimal-field-sample',
  templateUrl: './bl-decimal-field-sample.component.html',
})
export class BlDecimalFieldSampleComponent
  extends SampleAbstractComponent<BlDecimalFormGroup>
  implements OnInit
{
  currencyList = [
    CurrencyEnum.CHF,
    CurrencyEnum.XFP,
    CurrencyEnum.DOLLAR,
    CurrencyEnum.GBP,
    CurrencyEnum.EUR,
  ];
  iconClassName = 'euro';
  suffixLabel = 'NO';
  prefixLabel = 'NO';
  public prefix ;
  public customErrorMap = new Map<string, string>();
  public ts : ToasterService;
  constructor(toasterService :ToasterService){
    super();
    this.ts = toasterService;
  }
  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      rate: new FormControl<number>(4.91),
      amountEuro: new FormControl<number>(10.50),
      price:  new FormControl<number>(50),
      negativeValue : new FormControl<number>(-6.3),
      withAddedZeros : new FormControl<number>(7.90000),
      amountReadOnly: new FormControl<number>(20.05),
      currency: new FormControl<string | null>(CurrencyEnum.EUR),

    });

    //this.initData();
    this.customErrorMap.set(
      'min',
      'pages.variables.form-error.customErrorMessage.text-field.min'
    );
    this.customErrorMap.set(
      'notEven',
      'pages.variables.form-error.customErrorMessage.text-field.odd'
    );
    this.customErrorMap.set('required', 'form.error.required');
  }
  checkValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the value is a number and is even
      const isEven = typeof value === 'number' && value % 2 === 0;

      return isEven ? null : { notEven: true };
    };
  }
  onSelected(value: string): void {
    switch (value) {
      case CurrencyEnum.CHF:
        this.iconClassName = '';
        this.suffixLabel = CurrencyEnum.CHF;
        this.prefixLabel = CurrencyEnum.CHF;
        break;
      case CurrencyEnum.XFP:
        this.iconClassName = '';
        this.suffixLabel = CurrencyEnum.XFP;
        this.prefixLabel = CurrencyEnum.XFP;
        break;
      case CurrencyEnum.DOLLAR:
        this.iconClassName = 'dollar';
        break;
      case CurrencyEnum.EUR:
        this.iconClassName = 'euro';
        break;
      case CurrencyEnum.GBP:
        this.iconClassName = 'gbp';
        break;
      default:
        break;
    }
  }

  onWriteValue(value: any) {
    this.ts.success('sample.decimal.writeValueEvent');
  }
}
