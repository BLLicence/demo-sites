import {Component, EventEmitter} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlDialogService, ConfirmDialogConfigModel, IconClassEnum, WaitDialogConfigModel} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {timer} from 'rxjs';
import {
  BlDialogConfig, BlDialogConfigInt,
  DialogType
} from "../../../../../../../libs/shared-ui/src/lib/models/bl-dialog/bl-dialog-config.model";

@Component({
    selector: 'bl-dialog-sample',
    templateUrl: './bl-dialog-sample.component.html',
})
export class BlDialogSampleComponent {
    isButtonWithIcon: boolean = false;
    // Exemple d'utilisation : Message spécifique métier
    private isCustomized: boolean = true;

    constructor(
        private blDialogService: BlDialogService,
        public translate: TranslateService,
        private toasterService: ToasterService
    ) {
    }

    // Exemple d'utilisation : Message d'action réussie
    openSuccessDialog() {
        const successEvent = new EventEmitter();
        successEvent.subscribe((resp) =>
            this.toasterService.success('successEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSuccessDialog(
            {data: 'Success'},
            'sample.dialog.success.title',
            'sample.dialog.success.text',
            successEvent,
            closeEvent,undefined,
            'MyDialogSuccessTestLabel',
            this.isButtonWithIcon
        );
    }


  /**
   * Example of usage of the generic method blDialogService.openDialog()
   * opens a Success dialog
   */
  openGenericSuccessDialog(){
    const okEvent = new EventEmitter();
    okEvent.subscribe((resp) =>
      this.toasterService.success('okEvent '.concat(resp.data))
    );
    const noEvent = new EventEmitter();
    noEvent.subscribe((resp) =>
      this.toasterService.warning('noEvent '.concat(resp.data))
    );
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp) =>
      this.toasterService.success('closeEvent '.concat(resp.data))
    );

    let successConfig : BlDialogConfig = {
      data: {data:'Success'},
      title:'sample.dialog.success.title',
      text :'sample.dialog.success.text',
      yesEvent:okEvent,
      noEvent:noEvent,
      cancelEvent:null,
      closeEvent:closeEvent,
      isButtonsWithIcon: true,
      yesButton: {titleButton : 'sample.button.validate',icon:'check'},
      noButton:{titleButton : 'sample.button.rollback',icon:'rollback'},
      cancelButton:undefined,
      waitDialogConfig:undefined,
      testLabel:'MyGenericSuccessDialog'
    };
    this.blDialogService.openDialog(successConfig,DialogType.SUCCES);
  }
  /**
   * Example of usage of the generic method blDialogService.openDialog()
   * opens an Error of Technical Error dialog
   */
  openGenericErrorDialog(system_error:boolean) {
    const okEvent = new EventEmitter();
    okEvent.subscribe((resp) =>
      this.toasterService.success('ok Event '.concat(resp.data))
    );
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp) =>
      this.toasterService.success('closeEvent '.concat(resp.data))
    );
    let dialogData : any ;
    let dialogType : any;
    let dialogTitle : string;
    let dialogText : string ;
     if(system_error){
       dialogData = {data:'Erreur System'};
       dialogType = DialogType.SYSTEM_ERROR;
       dialogTitle = 'sample.dialog.technicalError.title';
       dialogText = 'sample.dialog.technicalError.text';
     }else{
       dialogData = {data:'Erreur'};
       dialogType = DialogType.ERROR;
       dialogTitle = 'sample.dialog.error.title';
       dialogText = 'sample.dialog.error.text';
     }

    let errorConfig : BlDialogConfig = {
      data: dialogData,
      title:dialogTitle,
      text :dialogText,
      yesEvent:okEvent,
      noEvent:null,
      cancelEvent:null,
      closeEvent:closeEvent,
      isButtonsWithIcon: true,
      yesButton: {titleButton : 'viewer.form.dialog.ok',icon:'check'},
      noButton:undefined,
      cancelButton:undefined,
      waitDialogConfig:undefined,
      testLabel:'MyGenericErrorDialog'
    };
    this.blDialogService.openDialog(errorConfig,dialogType);
  }

  openGenericDeleteDialog() {
    const okEvent = new EventEmitter();
    okEvent.subscribe((resp) =>
      this.toasterService.success('okEvent '.concat(resp.data))
    );
    const noEvent = new EventEmitter();
    noEvent.subscribe((resp) =>
      this.toasterService.warning('noEvent '.concat(resp.data))
    );
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp) =>
      this.toasterService.success('closeEvent '.concat(resp.data))
    );

    let deleteConfig : BlDialogConfig = {
      data: {data:'Delete'},
      title:'sample.dialog.delete.title',
      text :'sample.dialog.delete.text',
      yesEvent:okEvent,
      noEvent:noEvent,
      cancelEvent:null,
      closeEvent:closeEvent,
      isButtonsWithIcon: true,
      yesButton: {titleButton : 'sample.button.validate',icon:'check'},
      noButton:{titleButton : 'sample.button.rollback',icon:'rollback'},
      cancelButton:undefined,
      waitDialogConfig:undefined,
      testLabel:'MyGenericDeleteDialog'
    };
    this.blDialogService.openDialog(deleteConfig,DialogType.DELETE);
  }

  openGenericSaveDialog() {
    const okEvent = new EventEmitter();
    okEvent.subscribe((resp) =>
      this.toasterService.success('okEvent '.concat(resp.data))
    );
    const noEvent = new EventEmitter();
    noEvent.subscribe((resp) =>
      this.toasterService.warning('noEvent '.concat(resp.data))
    );
    const cancelEvent = new EventEmitter();
    cancelEvent.subscribe((resp) =>
      this.toasterService.success('cancelEvent '.concat(resp.data))
    );
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp) =>
      this.toasterService.success('closeEvent '.concat(resp.data))
    );

    let saveConfig : BlDialogConfig = {
      data: {data:'Save'},
      title:'sample.dialog.save.title',
      text :'sample.dialog.save.text',
      yesEvent:okEvent,
      noEvent:noEvent,
      cancelEvent:cancelEvent,
      closeEvent:closeEvent,
      isButtonsWithIcon: false,
      yesButton: {titleButton : 'sample.button.save'},
      noButton:{titleButton : 'sample.button.dont-save'},
      cancelButton:{titleButton : 'sample.button.rollback'},
      waitDialogConfig:undefined,
      testLabel:'MyGenericSaveDialog'
    };
    this.blDialogService.openDialog(saveConfig,DialogType.SAVE);

  }

  openGenericInfoDialog() {
    const okEvent = new EventEmitter();
    okEvent.subscribe((resp) =>
      this.toasterService.success('Continuer la modification'.concat(resp.data))
    );
    const noEvent = new EventEmitter();
    noEvent.subscribe((resp) => {
        this.toasterService.warning('pages.basic.tableEditable2.dialog.unsave');
      }
    );
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp) =>
      this.toasterService.success('closeEvent '.concat(resp.data))
    );

    let infoConfig : BlDialogConfig = {
      data: {data:'Info'},
      title:'pages.basic.tableEditable2.dialog.form-uncompleted',
      text :'pages.basic.tableEditable2.dialog.text',
      yesEvent:okEvent,
      noEvent:noEvent,
      cancelEvent:null,
      closeEvent:closeEvent,
      isButtonsWithIcon: false,
      yesButton: {titleButton : 'pages.basic.tableEditable2.dialog.rollback'},
      noButton: {titleButton: 'pages.basic.tableEditable2.dialog.unsave'},
      cancelButton:null,
      waitDialogConfig:null,
      testLabel:'MyGenericInfoDialog'
    };
    this.blDialogService.openDialog(infoConfig,DialogType.INFO);

  }
    // Exemple d'utilisation : Message d'erreur Client
    openErrorDialog() {
        const errorEvent = new EventEmitter();
        errorEvent.subscribe((resp) =>
            this.toasterService.success('errorEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openErrorDialog(
            {data: 'Error'},
            'sample.dialog.error.title',
            'sample.dialog.error.text',
            errorEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    // Exemple d'utilisation : Message d'erreur Serveur
    openTechnicalErrorDialog() {
        const technicalErrorEvent = new EventEmitter();
        technicalErrorEvent.subscribe((resp) =>
            this.toasterService.success('technicalErrorEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openTechnicalErrorDialog(
            {data: 'Technical Error'},
            'sample.dialog.technicalError.title',
            'sample.dialog.technicalError.text',
            technicalErrorEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    // Exemple d'utilisation : Message de confirmation de sauvegarde
    openSaveDialog() {
        const saveEvent = new EventEmitter();
        saveEvent.subscribe((resp) =>
            this.toasterService.success('saveEvent '.concat(resp.data))
        );
        const notSaveEvent = new EventEmitter();
        notSaveEvent.subscribe((resp) =>
            this.toasterService.success('notSaveEvent '.concat(resp.data))
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSaveDialog(
            {data: 'Save'},
            'sample.dialog.save.title',
            'sample.dialog.save.text',
            saveEvent,
            notSaveEvent,
            cancelEvent,
            closeEvent,
            '',
            this.isButtonWithIcon,
            undefined,
        );
    }

    openSaveDialogBloc() {
        const saveEvent = new EventEmitter();
        saveEvent.subscribe((resp) => {
                this.toasterService.success('saveEvent '.concat(resp.data));
                timer(5000).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const notSaveEvent = new EventEmitter();
        notSaveEvent.subscribe((resp) => {
                this.toasterService.success('notSaveEvent '.concat(resp.data));
                timer(950).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSaveDialog({data: 'Save'},
          'sample.dialog.save.title',
          'sample.dialog.save.text',
          saveEvent,
          notSaveEvent,
          cancelEvent,
          closeEvent, 'dialog-save', this.isButtonWithIcon,
          undefined,undefined,undefined,
          new WaitDialogConfigModel('sample.dialog.wait.title', 'sample.dialog.wait.text', 1000), );
    }

    // Exemple d'utilisation : Message de confirmation de suppression
    openDeleteDialog() {
        const deleteEvent = new EventEmitter();
        deleteEvent.subscribe((resp) =>
            this.toasterService.success('deleteEvent '.concat(resp.data))
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openDeleteDialog(
            {data: 'Delete'},
            'sample.dialog.delete.title',
            'sample.dialog.delete.text',
            deleteEvent,
            cancelEvent,
            closeEvent,
            '',
            this.isButtonWithIcon,
            undefined,

        );
    }

    openInfoDialog() {
        const rollbackEvent = new EventEmitter();
        rollbackEvent.subscribe((resp) =>
            this.toasterService.success('pages.basic.tableEditable2.dialog.rollback')
        );
        const resetEvent = new EventEmitter();
        resetEvent.subscribe((resp) => {
                this.toasterService.warning('pages.basic.tableEditable2.dialog.unsave');
            }
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent ')
        );
        this.blDialogService.openInfoDialog(
            null,
            'pages.basic.tableEditable2.dialog.form-uncompleted',
            'pages.basic.tableEditable2.dialog.rollback',
            'pages.basic.tableEditable2.dialog.unsave',
            rollbackEvent,
            resetEvent,
            closeEvent,
            'save_list_confirm_dialog',
            false,
            undefined,
            'pages.basic.tableEditable2.dialog.text',
        );
    }

    openCustomDialog(timeoutBlockerMs?: number) {
        const yesEvent = new EventEmitter();
        yesEvent.subscribe((resp) => {
                this.toasterService.success('yesEvent '.concat(resp.data));
                if (timeoutBlockerMs) timer(5000).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const noEvent = new EventEmitter();
        noEvent.subscribe((resp) => {
                this.toasterService.success('noEvent '.concat(resp.data));
                if (timeoutBlockerMs) timer(950).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        const data = {data: 'Custom'};

        const confirmDialogConfig: ConfirmDialogConfigModel = {
            imgUrl: IconClassEnum.note_pencil,
            iconColor: '#5BB351',
            iconAddCircle: true,
            title: this.translate.instant('sample.dialog.custom.title', data),
            text: this.translate.instant('sample.dialog.custom.text', data),
            isButtonWithIcon: this.isButtonWithIcon,
            yesButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.yesButtonTxt'),
                icon: IconClassEnum.check
            },
            noButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.noButtonTxt'),
                icon: IconClassEnum.close
            },
            cancelButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.cancelButtonTxt'),
                icon: IconClassEnum.rollback
            },
            isCustomized: true,
            closeButtonTxt: this.translate.instant(
                'sample.dialog.custom.closeButtonTxt'
            ),
            yesEvent: yesEvent,
            noEvent: noEvent,
            waitDialogConfig: new WaitDialogConfigModel('sample.dialog.wait.title', 'sample.dialog.wait.text', timeoutBlockerMs),
        };

        this.blDialogService.openCustomDialog(
            data,
            confirmDialogConfig,
            yesEvent,
            noEvent,
            cancelEvent,
            closeEvent,
            this.isCustomized
        );
    }
}
