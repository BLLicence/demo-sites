import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@bl/shared';
import { BlAction, BlBasicObject, BlConfirmMessage, BlDialogService, IconClassEnum } from '@esedit-md/shared-ui';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

type FormType1 = {
  label1: string | null,
  label2: string | null,
  date1: moment.Moment | null,
  listBox: BlBasicObject | null
};
export type SampleFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@Component({
  selector: 'bl-tab-group-form-sample',
  templateUrl: './bl-tab-group-form-sample.component.html'
})
export class BlTabGroupFormSampleComponent implements OnInit {

  public pageIcon: IconClassEnum = IconClassEnum.layout;
  public formGroup1: SampleFormGroup<FormType1>;
  public listData: BlBasicObject[] = [];
  public actionsList: BlAction[] = [];

  constructor(
    private fb: FormBuilder, private translate: TranslateService, private ts: ToasterService,
    private blDialogService: BlDialogService, private changeDetectorRef: ChangeDetectorRef
  ) {
    // bl tab Actions
    const emitEventSave = new EventEmitter<any>();
    const emitEventCancel = new EventEmitter<any>();
    const cancel_label = translate.instant('sample.button.rollback');
    const save_label = translate.instant('sample.button.save');

    const button_save: BlAction = {
      idAction: '',
      eventEmitter: emitEventSave,
      label: save_label,
      idSelector: 'btn_save',
      primary: true,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'save'
    };

    const button_cancel: BlAction = {
      idAction: '',
      eventEmitter: emitEventCancel,
      label: cancel_label,
      idSelector: 'btn_cancel',
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'btn_cancel'
    };

    emitEventSave.subscribe((event) => {
      this.onSubmitForm(event);
    });
    emitEventCancel.subscribe(() => {
      this.onCancelForm();
    });
    this.actionsList.push(button_save, button_cancel);
  }

  ngOnInit() {
    this.initForms();
    this.initListData();
    this.checkFormSubmitButton();

    // Subscribe to form status changes
    this.formGroup1.statusChanges.subscribe(() => {
      this.checkFormSubmitButton();
    });
  }

  checkFormSubmitButton() {
    const buttonSave = this.actionsList.find(action => action.idSelector === 'btn_save');
    if (buttonSave) {
      buttonSave.disabled = this.formGroup1.invalid;
      // Manually trigger change detection
      this.changeDetectorRef.detectChanges();
    }
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

  initForms() {
    this.formGroup1 = this.fb.group({
      label1: ['', [Validators.required]],
      label2: ['', [Validators.required]],
      date1: [moment(new Date())],
      listBox: [this.listData[3]]
    });
  }

  onSubmitForm(event: any) {
    if (this.formGroup1.invalid) {
      this.ts.error('Formulaire invalide !');
    }
    if (this.formGroup1.valid) {
      this.ts.success(this.translate.instant('viewer.form.valid'));
      const confirm: BlConfirmMessage = {
        title: 'viewer.form.dialog.text',
        closeButtonTxt: 'viewer.form.dialog.close',
        yesButtonTxt: 'viewer.form.dialog.ok',
        iconType: 'success',
        text: JSON.stringify(this.formGroup1.value),
      };
      this.blDialogService.openConfirmDialog(confirm, null);
    }
  }

  onCancelForm() {
    this.formGroup1.reset();
    this.ts.warning('Formulaire annulé !');
  }
}
