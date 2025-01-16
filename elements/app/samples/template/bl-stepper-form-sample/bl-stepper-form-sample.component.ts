import { Component ,EventEmitter, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlAction, BlBasicObject, BlDialogService, FormErrorDisplayComponent, IconClassEnum } from '@esedit-md/shared-ui';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from '@bl/shared';
import { BlStepperComponent } from '../../../../../../../libs/shared-ui/src/lib/components/style/bl-stepper/bl-stepper.component';

type form_stepOne = {
  label1: string | null,
  listBox1: BlBasicObject | null,
  date1: moment.Moment | null,
  date2: moment.Moment | null,
  label2: string | null,
  label3: string | null,
  listBox2: BlBasicObject | null,
  checkbox1: boolean | null,
  checkbox2: boolean | null,
  radioBox : string | null;
}

type form_stepTow = {
  label2: string | null,
  label3: string | null,
  listBox2: BlBasicObject | null,
  checkbox1: boolean | null,
  checkbox2: boolean | null,
  radioBox2 : string | null;
};

export type SampleFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@Component({
  selector: 'bl-stepper-form-sample',
  templateUrl: './bl-stepper-form-sample.component.html',
  styleUrls: ['./bl-stepper-form-sample.component.scss'],
})
export class BlStepperFormSampleComponent implements OnInit {

  @ViewChild('blStepper') blstepper: BlStepperComponent;

  // Page template variables
  pageIcon : IconClassEnum = IconClassEnum.dots;
  iconBack : IconClassEnum = IconClassEnum.less;
  iconNext : IconClassEnum = IconClassEnum.greater;

  pageTitle : string;
  // Stepper variables
  public stepperActions1 : BlAction[] = [];
  public stepperActions2 : BlAction[] = [];
  public stepperActions3 : BlAction[] = [];

  public titlesList : string[]= [];

  // Formulaires
  public listData: BlBasicObject[] = [];
  public formGroup1 : SampleFormGroup<form_stepOne>;
  public formGroup2 : SampleFormGroup<form_stepTow>;
  private formGroups : FormGroup[] = [];

  public _nextBtn : string;
  public _previousBtn : string;
  public _resetBtn : string;

  public stepLabels : string[] = [];

  public listRadioBox = [
    {value: 1, label: 'Option 1'},
    {value: 2, label: 'Option 2'},
  ];

  @ViewChild(FormErrorDisplayComponent, {static: true}) formErrorDisplay: FormErrorDisplayComponent;

  constructor(private fb: FormBuilder,
    private translate :TranslateService,
    private ts: ToasterService, private blDialogService: BlDialogService){

      this.pageTitle = this.translate.instant('sample.stepper-form-template.example-title');

  }

  initStepperActions1() {
    // Button save
    let save_label = this.translate.instant('sample.button.save-for-later');
    let emitEventSave = new EventEmitter<any>();

    let button_save: BlAction = {
      idAction: '',
      eventEmitter: emitEventSave,
      label: save_label,
      idSelector: 'btn_save_for_later',
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'save_for_later'
    };

    emitEventSave.subscribe((event) => {
      this.onSubmitForm(event);
    });

    // Buttons métier
    let custom_label = this.translate.instant('sample.button.custom');
    let emintEventCustom = new EventEmitter<any>();

    let custom_button: BlAction = {
      idAction: '',
      eventEmitter: emitEventSave,
      label: custom_label,
      idSelector: 'btn_custom',
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'custom_button'
    };

    emintEventCustom.subscribe((event) => {
      // do somthing
    });
    // Action Next
    let nextEvent = new EventEmitter<any>();
    nextEvent.subscribe(()=>{
      this.nextStep(this.formGroup1);
    });
    let next_step1: BlAction = {
      idAction: '',
      eventEmitter: nextEvent,
      label: this._nextBtn,
      idSelector: 'btn_next1',
      icon: {
        icon: this.iconNext
      },
      primary: true,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'form1_button_next_step'
    };
    this.stepperActions1.push(custom_button,custom_button,button_save,next_step1);
  }
  initStepperActions2() {
    // Button Back
    let backEvent = new EventEmitter<any>();
    backEvent.subscribe(()=>{
      this.prevStep();
    });
    let previous_step2: BlAction = {
      idAction: '',
      eventEmitter: backEvent,
      label: this._previousBtn,
      idSelector: 'btn_previous2',
      icon: {
        icon: this.iconBack
      },
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'form2_button_next_step'
    };
    // Action Next
    let nextEvent2 = new EventEmitter<any>();
    nextEvent2.subscribe(()=>{
      this.nextStep(null);
    });
    let next_step2: BlAction = {
      idAction: '',
      eventEmitter: nextEvent2,
      label: this._nextBtn,
      idSelector: 'btn_next2',
      icon: {
        icon: this.iconNext
      },
      primary: true,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'form2_button_next_step'
    };
    this.stepperActions2.push(previous_step2,next_step2);

  }
  initStepperActions3() {
    // Button Back
    let backEvent = new EventEmitter<any>();
    backEvent.subscribe(()=>{
      this.prevStep();
    });
    let previous_step3: BlAction = {
      idAction: '',
      eventEmitter: backEvent,
      label: this._previousBtn,
      idSelector: 'btn_previous3',
      icon: {
        icon: this.iconBack
      },
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'form3_button_next_step'
    };
    // Action EXit
    let exit_label = this.translate.instant('sample.button.next');
    let exitEvent = new EventEmitter<any>();
    exitEvent.subscribe(()=>{
      this.resetStepper();
    });
    let exit_step3: BlAction = {
      idAction: '',
      eventEmitter: exitEvent,
      label: this._resetBtn,
      idSelector: 'btn_exit',
      primary: true,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'form3_button_reset'
    };
    this.stepperActions3.push(previous_step3,exit_step3);

  }
  ngOnInit(): void {
    // init labet boutons
    this._nextBtn = this.translate.instant('sample.button.next');
    this._previousBtn = this.translate.instant('sample.button.previous');
    this._resetBtn = this.translate.instant('sample.button.reset');

    this.initListData();
    this.initForms();
    this.formGroups.push(this.formGroup1);
    this.initFormsTitles();
    this.initStepperActions1();
    this.initStepperActions2();
    this.initStepperActions3();

    let labelStep1 = this.translate.instant('sample.stepper-form-template.step1');
    let labelStep2 = this.translate.instant('sample.stepper-form-template.step2');
    let labelStep3 = this.translate.instant('sample.stepper-form-template.step3');

   this.stepLabels = [labelStep1,labelStep2,labelStep3];

  }
  initFormsTitles() {
    let title1 = this.translate.instant('viewer.form.title1');
    let title2 = this.translate.instant('viewer.form.title2');
    let title3 = this.translate.instant('viewer.form.title3');
    let title4 = this.translate.instant('viewer.form.title4');
    this.titlesList = [title1,title2,title3,title4];
  }

  initForms() {
    //form for step one
   this.formGroup1 = new FormGroup({
    // groupe 1
      label1: new FormControl<string | null>({value: 'Nancy', disabled: false}, Validators.required),
      listBox1: new FormControl<BlBasicObject | null>(this.listData[3]),
      date1: new FormControl<moment.Moment>(moment(new Date())),
      date2: new FormControl<moment.Moment>(moment(new Date())),
    // groupe 2
      label2: new FormControl<string | null>({value: 'Emily', disabled: false}, Validators.required),
      label3: new FormControl<string | null>({value: 'Addresse 1', disabled: false}, Validators.required),
      listBox2: new FormControl<BlBasicObject | null>(this.listData[3]),

      checkbox1:  new FormControl(true),
      checkbox2:  new FormControl(false),
      radioBox: new FormControl<string | null>({value: '2',disabled: false}),
    });

    //form for step two
    this.formGroup2 = this.fb.group({

      label2: ['Test 2',[Validators.required]],
      label3: ['Test 3',[Validators.required]],
      listBox2: [this.listData[3]],

      checkbox1: [true],
      checkbox2: [false],
      radioBox2: ['1']
    });
  }

  initListData() {
    for (let i = 0; i < 20; i++) {
      this.listData.push({id: i, code: 'v_' + i, label: 'Valeur ' + i});
    }
    this.listData.push({
        id: 45,
        code: 'LONG',
        label: 'Une valeur avec un nom très très très longgggggggggggggggg !'
    });
  }
  nextStep(stepForm : FormGroup|undefined){
    if(stepForm && stepForm.invalid){

      this.ts.error(this.translate.instant('viewer.form.error'));
    }else{
      this.blstepper.nextStep();
    }
  }

  prevStep(){
    this.blstepper.previouseStep();
  }

  resetStepper(){

    this.ts.warning(this.translate.instant('viewer.form.terminate'));

  }

  onSubmitForm(event){
    if (this.formGroup1.invalid || this.formGroup2.invalid) {
      this.ts.error(this.translate.instant('viewer.form.invalid'));
      // accessibility
      setTimeout(() => {
        this.formErrorDisplay.focus();
      }, 500);
    }
    if (this.formGroup1.valid && this.formGroup2.valid) {
      this.ts.success(this.translate.instant('viewer.form.valid'));

    }
  }

}
