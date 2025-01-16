import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToasterService } from '@bl/shared';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';
import { BlSuffixIconColor, BlSuffixIconModel, BlSuffixRole, IconClassEnum } from '@esedit-md/shared-ui';

type BlLibelleFormGroup = {
    label1: string | null;
    label2: string | null;
    label3: string | null;
    label4: string | null;
    label5: string | null;
    label6: number | null;
    label7: string | null;
    label8: string | null;
    label9: string | null;
    label10: string | null;
    label11: string | null;
    label12: string | null;
    label13: string | null;
    label14: string | null;

};

@Component({
    selector: 'bl-libelle-sample',
    templateUrl: './bl-text-field-sample.component.html',
})
export class BlTextFieldSampleComponent
    extends SampleAbstractComponent<BlLibelleFormGroup>
    implements OnInit, AfterViewInit {
    public customErrorMap = new Map<string, string>();
  phoneNumber: string;
  phoneMaskOptions = null;
  ibanMaskOption= null;
  customSuffixExample : BlSuffixIconModel  ;
  customSuffixExample2 : BlSuffixIconModel  ;
  simpleSuffixExample: BlSuffixIconModel;
  icon_Arrow = IconClassEnum.arrow_up;
  icon_Folder = IconClassEnum.folder_simple_star
  clickEventCustom = new EventEmitter<any>();
  /*{
    mask: '+(33) 0 . 00 . 00 . 00 . 00 ',
    lazy: false
  };*/
  clickEvent (){
   this.toasterService.success("En cours")
  }
  clickEvent2(){
    this.toasterService.error("En cours")
  }

    public constructor(public toasterService: ToasterService) {
        super();
    }
    public ngOnInit(): void {
        this.formGroup = new FormGroup({
            label1: new FormControl<string | null>('Test 1', {
                validators: [this.maxLengthValidator()],
            }),
            label2: new FormControl<string | null>('Test 2',{validators:[Validators.required]}),
            label3: new FormControl<string | null>('Test 3'),
            label4: new FormControl<string | null>('Test 4'),
            label5: new FormControl<string | null>('Test 5'),
            label6: new FormControl<number | null>(2),
            label7: new FormControl<string | null>('Test 7'),
            label8: new FormControl<string | null>('Test 8'),
            label9: new FormControl<string | null>('06.66.55.44.33', {//Test 9
                validators: [this.phoneNumberValidator()],
            }),
            label10: new FormControl<string | null>('Test 9',{validators:[Validators.required]}),
          label11: new FormControl<string|null>(null),
          label12: new FormControl<string|null>(''),
          label13: new FormControl<string|null>(''),
          label14: new FormControl<string|null>(''),
        });
        this.initErrorMap();


      setTimeout(() => {
        this.phoneMaskOptions = {
          mask: '+(33) 0 . 00 . 00 . 00 . 00 ',
          lazy: false
        };
        // here we do a combination of letters and numbers , use 'a' for letters 0 for numbers
        this. ibanMaskOption = {
          mask: 'FR**  **0* *a0* **** **',
          lazy: false,
          prepareChar:str=>str.toUpperCase()
        };
              this.formGroup.controls.label11.patchValue('123456789');
      }, 500);


      this.customSuffixExample= {tooltip:'Exemple tooltip',role:BlSuffixRole.BUTTON,color:BlSuffixIconColor.SUCCESS,testLabelValue:"iconExample",clickEvent:new EventEmitter<any>()}
      this.customSuffixExample.clickEvent?.subscribe(()=>{this.clickEvent()})
      this.customSuffixExample2= {tooltip:'Exemple tooltip 2',role:BlSuffixRole.BUTTON,color:BlSuffixIconColor.ERROR,testLabelValue:"iconExample",clickEvent:new EventEmitter<any>()}
      this.customSuffixExample2.clickEvent?.subscribe(()=>{this.clickEvent2()})
      this.simpleSuffixExample= {tooltip:'Exemple tooltip',role:BlSuffixRole.DEFAULT,color:BlSuffixIconColor.DEFAULT,testLabelValue:"iconExample",clickEvent:new EventEmitter<any>()}


    }

  private initErrorMap() {
    this.customErrorMap.set(
      'maxLengthExceeded',
      'pages.variables.form-error.customErrorMessage.text-field.maxLengthExceeded'
    );
    this.customErrorMap.set(
      'invalidPhoneNumber',
      'pages.variables.form-error.customErrorMessage.text-field.invalidPhoneNumber'
    );
    this.customErrorMap.set('required', 'form.error.required');
    this.customErrorMap.set('required', 'custumValidation.required');

  }
    ngAfterViewInit() {
      /*  this.formGroup.controls.label7.addValidators(
            this.specificFormat(this.formGroup.controls.label7)// a evoluer !
        );
        this.formGroup.controls.label7.addValidators(
            this.specificFormat2(this.formGroup.controls.label7)
        );*/
    }

    maxLengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            const isLengthValid = (value==null) || value?.length <= 4;
            return isLengthValid ? null : { maxLengthExceeded: true };
        };
    }
    phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            const phoneNumberRegex = /^(\d{2})[-.\s/\\]?(\d{2})[-.\s/\\]?(\d{2})[-.\s/\\]?(\d{2})[-.\s/\\]?(\d{2})$/;

            const isPhoneNumberValid = phoneNumberRegex.test(value);

            return isPhoneNumberValid ? null : { invalidPhoneNumber: true };
        };
    }
    onError(event): void {
        const inputElement = document.getElementById('9') as HTMLInputElement;
        inputElement.placeholder = '0000000000';
    }

    onBlur(event): void {
        document.getElementById('8').style.color = 'var(--secondary-color)';
        this.toasterService.success('(onBlurAction)');
    }

    private specificFormat(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('a')) {
                    return { mina: {'mina':10} };// validatorName : { param : value }
                }
            }
            return null;
        };
    }

    private specificFormat2(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('c')) {
                    return { minc: true };
                }
            }
            return null;
        };
    }


}
