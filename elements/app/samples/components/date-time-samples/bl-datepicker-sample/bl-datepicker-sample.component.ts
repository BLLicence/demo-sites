import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import moment from 'moment';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlDatePickerFormGroup = {
    date: moment.Moment | null,
  dateWithRestriction : moment.Moment | null,
    dateReadOnly: moment.Moment | null,
    locale: string,
    format: string,
    lunarDate1:string,
    lunarDate2:string

};

@Component({
    selector: 'bl-date-picker-sample',
    templateUrl: './bl-datepicker-sample.component.html'
})
export class BlDatepickerSampleComponent extends SampleAbstractComponent<BlDatePickerFormGroup> implements OnInit {

    public formatList = ['DD/MM/YY', 'DD/MM/YYYY', 'MMMM/YYYY', 'MM/YYYY', 'DD/MMMM'];
    public localeList = ['fr-FR', 'en-US', 'es-ES'];
    customErrorMap = new  Map<string,string>;
    lunarCustomErrorMap = new  Map<string,string>;

  minDate: Date;
  maxDate: Date;
    constructor() {
        super();
    }

    public ngOnInit(): void {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();

// Set the maximum date to today plus 6 days
      this.maxDate = new Date();
      this.maxDate.setDate(this.minDate.getDate() + 6);

        this.formGroup = new FormGroup({
                date: new FormControl<moment.Moment>(moment(new Date()),{validators:[this.validateCustomDate()]},),
                dateWithRestriction: new FormControl<moment.Moment>(moment(new Date()),{validators:[this.validateCustomDate()]},),
                dateReadOnly: new FormControl<moment.Moment>(moment(new Date())),
                format: new FormControl<string>('DD/MM/YY', {nonNullable: true}),
                locale: new FormControl<string>('fr-FR', {nonNullable: true}),
                lunarDate1 : new FormControl<string>('00-89-11',{validators:[this.validateLunarDate()]},),
                lunarDate2 : new FormControl<string>(null)
            }
        );
        this.customErrorMap.set('customDateError','pages.variables.form-error.customErrorMessage.date-picker.dateNow');
        this.lunarCustomErrorMap.set('invalidFormat','pages.variables.form-error.customErrorMessage.lunar-date-picker.invalidFormat');

    }

    public isRequired(): boolean {
        return this.formGroup.hasValidator(Validators.required);
    }

    public resetDatePicker(): void {
        this.formGroup?.controls?.date?.reset();
        this.formGroup?.controls?.dateWithRestriction?.reset();
    }
  // Custom validator function for the date FormControl

  private validateCustomDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value;
      const targetDate = moment(new Date());

      // Check if the selected date is equal to '11/12/23'
      if (selectedDate && !selectedDate.isSame(targetDate, 'day')) {
        return { customDateError: true };
      }

      return null;
    };
  }
  private validateLunarDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value;

      // Check if the selected date is on format XX-XXX-XX
      if (selectedDate && selectedDate.length!=8) {
     //   console.log("lengh :",selectedDate.length)

        return { invalidFormat: true };
      }

      return null;
    };
  }

}
