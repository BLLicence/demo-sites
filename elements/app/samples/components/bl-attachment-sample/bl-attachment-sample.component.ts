import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AttachmentValidators, FileInfo, IconClassEnum, IconInfos } from '@esedit-md/shared-ui';
import { CodeTabElement } from '../../../util/code-tab/code-tab.component';
import {
  readonlyExampleTemplate,
  fullExampleTs,
  fullExampleTemplate,
  readonlyExampleTs,
  fullExampleTemplate2,
  fullExample2Ts,
} from './attach.constantes';
import {ToasterService} from "@bl/shared";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'bl-attachment-sample',
  templateUrl: './bl-attachment-sample.component.html',
  styleUrls: ['./bl-attachment-sample.component.scss'],
})
export class BlAttachmentSampleComponent implements OnInit {
  @HostBinding('style.flex-grow') flexGrow = '1';
  @HostBinding('style.min-height') minHeight = '0';
  @HostBinding('style.min-width') minWidth = '0';
  @HostBinding('style.display') display = 'flex';

  form: UntypedFormGroup = new UntypedFormGroup({});
  form2: UntypedFormGroup = new UntypedFormGroup({});

  uniquePJCode: CodeTabElement[] = [];
  readOnlyFile: FileInfo;
  filesCtrlName: string;
  // -- constants containing code --
  readonlyExampleHTML = readonlyExampleTemplate;
  readonlyExampleTs = readonlyExampleTs;
  fullExampleTemplate2 = fullExampleTemplate2;
  fullExampleTs = fullExampleTs;
  fullExampleTemplate = fullExampleTemplate;
  fullExample2Ts = fullExample2Ts;

  // for the evolution of expansion functionnalities
  expand = false;
  openAll = IconClassEnum.caret_down;
  closeAll = IconClassEnum.caret_up;
  iconCode : IconInfos = {
    class: IconClassEnum.gear2,
    size :2,
    color: 'var(--bs-red)',
    testLabel: 'icon-home'

   }
  constructor(private fb: UntypedFormBuilder, private toasterService: ToasterService, private translate:TranslateService,private cd :ChangeDetectorRef) {
    // initialize a readOnly file
    this.readOnlyFile = new FileInfo(
      'test-file.pdf',
      250 * 1024,
      new Date(),
      ''
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fileCtrl: [
        null,
        [
          Validators.required,
          AttachmentValidators.maxSize(1024 * 500),
          AttachmentValidators.acceptExtension('pdf'),
        ],
      ],
    });
    this.form2 = this.fb.group({
      fileCtrl2: [
        null,
        [
          Validators.required,
          AttachmentValidators.maxSize(1024 * 500),
          AttachmentValidators.acceptExtension('pdf'),
        ],
      ],
    });
    this.form2.reset({
      fileCtrl2: new FileInfo('test.pdf', 250 * 1024, new Date(), ''),
    });

    this.uniquePJCode.push(
      { name: 'TS', code: this.fullExampleTs },
      { name: 'HTML', code: this.fullExampleTemplate }
    );

    this.simulateDelay();
  }

  sizeMo(s: number): string {
    return `(${Math.round((s / 1024 / 1024 + Number.EPSILON) * 100) / 100} Mo)`;
  }

  onFileChange(event: any) {
  }

  /**
   * open the selected file in new window
   * @param obj : File | FileInfo | string | null
   * @returns
   */
  openFile(obj: any): Window | null {
    let win: Window | null = null;
    if (obj instanceof Blob) {

      win = this.openBlob(obj);
    }
    return win;
  }

  /**
   * open the file of type Blob on new window
   */
  openBlob(blob: Blob, win: any = null): Window | null {
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

  submitPJ() {}

  expandAll(){
    this.expand = true;
  }
  collapseAll(){
    this.expand = false;
  }

  onDeleteFile(value) {
    let msg = this.translate.instant('pages.attachment.msg-file-deleted');
    this.toasterService.success(msg.concat(String(' '+value)));
  }

  changeFile() {
  }

  private simulateDelay() {

    setTimeout(()=>{
      this.form.controls['fileCtrl'].setValue(new FileInfo(
        'test-file.pdf',
        250 * 1024,
        new Date(),
        ''
      ));
    },2000)
  }
}
