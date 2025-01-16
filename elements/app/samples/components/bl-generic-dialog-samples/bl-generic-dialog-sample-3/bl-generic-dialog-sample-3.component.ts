import {Component, ViewChild} from '@angular/core';
import {BlDialogService, BlGenericDialogComponent, BlGenericDialogService} from "@esedit-md/shared-ui";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "@bl/shared";
import {TranslateService} from "@ngx-translate/core";
import {delay, mergeMap, Observable, of, throwError} from "rxjs";

@Component({
  selector: 'bl-generic-dialog-sample-3',
  templateUrl: './bl-generic-dialog-sample-3.component.html',
  styleUrls: ['./bl-generic-dialog-sample-3.component.scss'],
})
export class BlGenericDialogSample3Component {
  @ViewChild('dialog', {static: true}) dialog: BlGenericDialogComponent;

  message = this.translateService.instant('sample.generic-dialog.hint2')

  error_msg = this.translateService.instant('sample.generic-dialog.form-error');
  success_msg = this.translateService.instant('sample.generic-dialog.valid-form');
  event_msg = this.translateService.instant('sample.generic-dialog.event-in-process');
  actions_activated = this.translateService.instant('sample.generic-dialog.actions-activated');

  formGroup = new FormGroup({
    label1: new FormControl({value: '', disabled: false}, Validators.required),
  });

  constructor(
    private blDialogService: BlDialogService,
    private blGenDialogService : BlGenericDialogService,
    private ts: ToasterService,
    private translateService: TranslateService
  ) {
  }

  validateForm = (args: any): boolean => {
    if (this.formGroup.valid) {
      return true;
    } else {
      this.formGroup.markAllAsTouched();
      return false;
    }
  }

  event(code: string) {

    const duration = Number(this.formGroup.controls['label1'].value);
    let result = null;
    switch(code) {
      case 'yes':
        this.simulateTreatment(duration).subscribe({
          next: (res) => {
            result = res;
            this.blGenDialogService.dislockClickButtons();
            this.ts.success(this.actions_activated);
            //this.blDialogService.closeGenericDialog(this.success_msg);

          },
          error: (err) => {
            result = err.message;
            this.ts.error(this.error_msg);
            this.blGenDialogService.dislockClickButtons();
            this.ts.success(this.actions_activated);
          }
        });
        break;
      case 'no':
        this.blDialogService.closeGenericDialog("quitter");
        break;
      case 'cancel':
        this.blDialogService.closeGenericDialog();
        break;
    }
  }

  simulateTreatment(duration: number):Observable<string>{
    this.ts.warning(this.event_msg)
    let success = duration > 5;
    return of(success).pipe(
      delay(2000), // Delay for 2 seconds
      mergeMap(isSuccess=>{
        if(isSuccess){
          return of (this.success_msg);
        }else{
          return throwError(()=>new Error(this.error_msg));
        }
      })
    );

  }

}
