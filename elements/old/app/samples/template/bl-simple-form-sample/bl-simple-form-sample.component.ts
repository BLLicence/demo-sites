import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import moment from 'moment';
import {
  BlAction,
  BlBasicObject,
  BlConfirmMessage,
  BlDialogService,
  FormErrorDisplayComponent,
  IconClassEnum,
  OptionGroup,
  SelectGroupSearchComponent
} from '@esedit-md/shared-ui';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';
import { ToasterService } from '@bl/shared';
import { LayoutService } from '@bl/bl-app-layout';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';


type ExempleFormType = {
  label1: string | null,
  label2: string | null,
  label3: string | null,
  listBox: BlBasicObject | null,
  date1: moment.Moment | null,
  date2: moment.Moment | null,
  checkbox1: boolean | null,
  checkbox2: boolean | null,
  radioBox: string | null,
  classification: any | null

};

@Component({
  selector: 'bl-simple-form-sample',
  templateUrl: './bl-simple-form-sample.component.html',
  styleUrls: ['./bl-simple-form-sample.component.scss']
})
export class BlSimpleFormSampleComponent extends SampleAbstractComponent<ExempleFormType> implements OnInit, AfterViewInit {

  public listData: BlBasicObject[] = [];
  //pour gestion des erreurs
  public formLabels = '';
  public deleteAction: BlAction[] = [];
  public pageIcon: IconClassEnum = IconClassEnum.layout;
  public pageTitle: string;

  public listRadioBox = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ];

  @ViewChild(FormErrorDisplayComponent, { static: true }) formErrorDisplay: FormErrorDisplayComponent;
  @ViewChild(SelectGroupSearchComponent) selectGroupSearchComponent!: SelectGroupSearchComponent;

  constructor(private toastr: ToastrService,
              private blDialogService: BlDialogService,
              private fb: FormBuilder, private ts: ToasterService,
              public layout: LayoutService, private translate: TranslateService,
              private location: Location) {
    super();
  }


specificValueValidator(expectedLabel: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedOption = control.value;
    return selectedOption === expectedLabel ? null : { specificValue: true };
  };}

  public ngOnInit(): void {
    this.formLabels = 'sample.libelle.';
    this.pageTitle = this.translate.instant('menu.formExamples.simpleForm');

    this.initListData();


    this.formGroup = this.fb.group({
      label1: ['', [Validators.required]],
      label2: ['Test 2', [Validators.required]],
      label3: ['Test 3', [Validators.required]],
      listBox: [this.listData[-1], [Validators.required]],
      date1: [moment(new Date())],
      date2: [moment(new Date())],
      classification: [null, [Validators.required]],
      checkbox1: [true],
      checkbox2: [false],
      radioBox: ['1']

    });
  }

  initListData() {
    for (let i = 0; i < 20; i++) {
      this.listData.push({ id: i, code: 'v_' + i, label: 'Valeur ' + i });
    }
    this.listData.push({
      id: 45,
      code: 'LONG',
      label: 'Une valeur avec un nom très très très longgggggggggggggggg !'
    });
  }

  ngAfterViewInit() {

  }

  public onChange($event) {
  }

  public onSubmitForm() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      this.ts.error('Formulaire invalide !');
      // accessibility
      setTimeout(() => {
        this.formErrorDisplay.focus();
      }, 500);
    }
    if (this.formGroup.valid) {
      this.toastr.success(this.translate.instant('viewer.form.valid'));
      const confirm: BlConfirmMessage = {
        title: 'viewer.form.dialog.text',
        closeButtonTxt: 'viewer.form.dialog.close',
        yesButtonTxt: 'viewer.form.dialog.ok',
        iconType: 'success',
        text: JSON.stringify(this.formGroup.value)
      };


      this.blDialogService.openConfirmDialog(confirm, null);

    }

  }

  public cancelAction() {
    this.formGroup.reset();
    this.formGroup.markAsUntouched();

    this.ts.warning('Formulaire vidé !');
  }

  public getToPreviousPage() {
    // go back to the previouse page
    this.location.back();
  }

  classificationsOptionGroups: OptionGroup[] = [
    {
      label: 'Premier',
      options: [
        { label: 'Délibération', value: '1', isHidden: false },
        { label: 'Arrêtés réglementaires', value: '2', isHidden: false },
        { label: 'Arrêtés individuels', value: '3', isHidden: false },
        { label: 'Contrats et conventions', value: '4', isHidden: false },
        {
          label: 'Documents budgétaires et financiers',
          value: '5',
          isHidden: false
        },
        { label: 'Autres', value: '6', isHidden: false }
      ]

    },
    {
      label: 'Second',
      isHidden: false,
      options: [
        { label: 'Délibération', value: '1', isHidden: false },// for test purpose !
        { label: 'Arrêtés réglementaires', value: '2', isHidden: false },
        { label: 'Arrêtés individuels', value: '3', isHidden: false },
        { label: 'Contrats et conventions', value: '4', isHidden: false },
        {
          label: 'Documents budgétaires et financiers',
          value: '5',
          isHidden: false
        },
        { label: 'Autres', value: '6', isHidden: false }
      ]
    }
  ];

}
