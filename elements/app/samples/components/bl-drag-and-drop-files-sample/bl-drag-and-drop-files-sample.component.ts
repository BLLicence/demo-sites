import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SampleFormGroup } from "../../SampleAbstractComponent";
import {
  BlDragAndDropFilesComponent,
  BLFileProgress,
  FileOrFileInfo,
  MultiAttachmentValidators
} from "@esedit-md/shared-ui";
import { ToasterService } from "@bl/shared";
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";

type BLFileFormGroupe = {
  attachmentsList: FileOrFileInfo[] | null,
}

export type ErrorStateFiles = {
  file: FileOrFileInfo | any;
  hasError: boolean;
}

@Component({
  selector: 'bl-drag-and-drop-files-sample',
  templateUrl: './bl-drag-and-drop-files-sample.component.html',
  styleUrls: ['./bl-drag-and-drop-files-sample.component.scss'],
})
export class BlDragAndDropFilesSampleComponent implements OnInit {

  /* @HostListener('dnd1') dragAndDrop1 : BlDragAndDropFilesComponent;
   @HostListener('dnd3') dragAndDrop3 : BlDragAndDropFilesComponent;
   @HostListener('dnd2') dragAndDrop2 : BlDragAndDropFilesComponent;
   @HostListener('dnd4') dragAndDrop4 : BlDragAndDropFilesComponent;*/

  // for change detection
  //@ViewChild('dnd4') dnd4 : BlDragAndDropFilesComponent;

  public formGroup1: SampleFormGroup<BLFileFormGroupe>;
  public formGroup2: SampleFormGroup<BLFileFormGroupe>;
  public formGroup3: SampleFormGroup<BLFileFormGroupe>;
  public formGroup4: SampleFormGroup<BLFileFormGroupe>;
  public formGroup5: SampleFormGroup<BLFileFormGroupe>;


  constructor(private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef, private toasterService: ToasterService,) {
  }

  ngOnInit(): void {
    this.formGroup1 = new FormGroup({
      attachmentsList: new FormControl<FileOrFileInfo[] | null>(null),
    });
    this.formGroup2 = new FormGroup({
      attachmentsList: new FormControl<FileOrFileInfo[] | null>(null),
    });
    this.formGroup3 = new FormGroup({
      attachmentsList: new FormControl<FileOrFileInfo[] | null>(null),
    });

    this.formGroup4 = this.fb.group({
      attachmentsList: [null, [
        MultiAttachmentValidators.maxSize(1024 * 500)]]
    });
    this.formGroup5 = new FormGroup({
      attachmentsList: new FormControl<FileOrFileInfo[] | null>(null),
    });
  }
  /**
   * open the selected file in new window
   * @param obj : File | FileInfo | string | null
   * @returns
   */
  openFile(obj: any) {

    let win: Window | null = null;
    if (obj instanceof Blob) {

      win = this.openBlob(obj);
    }
    return win;
  }

  /**
   * Logs if the specified has been blocked.
   * @param win
   */
  private logIfWindowIsBlocked(win: Window) {
    setTimeout(() => {
      if (win.closed) {
        console.log('new window/tab has been closed/blocked!');
      }
    }, 250);
  }

  /**
   * open the file of type Blob on new window
   */
  private openBlob(blob: Blob, win: any = null): Window | null {
    const url = URL.createObjectURL(blob);
    if (win) {
      win.location = `${url}`;
    } else {
      win = window.open(url, '_blank');
    }
    this.logIfWindowIsBlocked(win);
    return win;
  }
  /**
   * Simulate the upload process
   */

  /**
   * upload when the file is valid
   */
  uploadFileSimulator(file: BLFileProgress) {
    console.log("uploading file ", file);
    // verify the errorState of the file
    setTimeout(() => {

      const progressInterval = setInterval(() => {
        if (file.progress === 100) {
          clearInterval(progressInterval);
        } else {
          file.progress += 5;
          this.cdr.detectChanges();
        }
      }, 200);
    }, 1000);
  }

  removeUploadedFile(file: FileOrFileInfo, formNumber: number) {
    const formGroup = this['formGroup' + formNumber];
    if (formGroup) {
      const attachmentsList = formGroup.get('attachmentsList')?.value;
      if (attachmentsList) {
        const updatedList = attachmentsList.filter((item: FileOrFileInfo) => item !== file);
        formGroup.get('attachmentsList').reset();//was here !
        formGroup.get('attachmentsList')?.setValue(updatedList);
        formGroup.get('attachmentsList').updateValueAndValidity();
        this.toasterService.success(`File removed from the server`);
      }
    }

  }

  onSubmitFilesList(formGroup: SampleFormGroup<BLFileFormGroupe>) {
    if (formGroup.valid) {
      this.toasterService.success('Fichiers envoyés avec succès');
    }
    this.toasterService.error('Erreur du formulaire');
  }
}
