import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {SampleAbstractComponent} from "../../SampleAbstractComponent";
import {TranslateService} from "@ngx-translate/core";
type CustomFormGroup = {
  label1: string | null;
  label2: string |null;
  label3: string |null;
}
@Component({
  selector: 'bl-custom-error-sample',
  templateUrl: './bl-custom-error-sample.component.html',
  styleUrls: ['./bl-custom-error-sample.component.scss'],
})
export class BlCustomErrorSampleComponent extends SampleAbstractComponent<CustomFormGroup>
  implements OnInit, AfterViewInit {

  public customErrorMap1 = new Map<string, string>();
  public customErrorMap2 = new Map<string, string>();
  public customErrorMap3 = new Map<string, string>();



  constructor(translate : TranslateService) {
    super();
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      label1: new FormControl<string | null>('Test'),
      label2: new FormControl<string | null>('Test 2'),
      label3: new FormControl<string | null>('Test 3'),

    });
    this.customErrorMap1.set('maxLengthError', 'pages.custom-error.maxLength');
    this.customErrorMap2.set('minLengthError', 'pages.custom-error.minLength');
    this.customErrorMap3.set('unvalidNumber', 'pages.custom-error.unvalidNumber');
  }
  ngAfterViewInit(): void {
    this.initValidators();
  }
  private initValidators() {
    this.formGroup.controls.label1.addValidators(
      this.getErrorValueMaxLenght(this.formGroup.controls.label1, 5)
    );
    this.formGroup.controls.label2.addValidators(
      this.getErrorMinLenght(this.formGroup.controls.label2, 5)
    );
    this.formGroup.controls.label3.addValidators(
      this.getDecimalError(this.formGroup.controls.label3)
    );
  }
  private getErrorValueMaxLenght(formControl: FormControl | undefined, max): ValidatorFn {
    return (): ValidationErrors | null => {
      if (formControl && formControl.value) {
        const textValue: string | null = this.formGroup.controls.label1.value;
        if (textValue?.length > max) {
          return { maxLengthError: {'maxAuthorised':max} };// validatorName : { param : value }
        }
      }
      return null;
    };
  }

  private getErrorMinLenght(formControl: FormControl| undefined, min: number) {
    return (): ValidationErrors | null => {
      if (formControl && formControl.value) {
        const textValue: string | null = this.formGroup.controls.label2.value;
        if (textValue?.length < min || textValue?.length===0) {
          return { minLengthError: {'minAuthorised':min} };// validatorName : { param : value }
        }
      }
      return null;
    };
  }

  private getDecimalError(formControl: FormControl| undefined) {
  // console.log("decimal error!")
    return (): ValidationErrors | null => {
      if (formControl && formControl.value) {
        const textValue: string | null = this.formGroup.controls.label3.value;
        if (textValue =='0,0') {
          return { unvalidNumber: {'number': '0,0' } };
        }
      }
      return null;
    };
  }
}
