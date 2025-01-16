import {Component} from '@angular/core';
import { BlSharedService, IconClassEnum } from '@esedit-md/shared-ui';
import {FormControl} from "@angular/forms";

@Component(
    { selector:'bl-icon-picker-sample',
        templateUrl:'bl-icon-picker-sample.component.html'
    }
)
export class BlIconPickerSampleComponent{

    customIcons = new Map<string,string>;
    iconReadOnly = 'ph-fill ph-currency-eur';
    valueForm = new FormControl<any | null>(this.iconReadOnly);
    public isIConFilled: boolean;

    constructor( blSharedService: BlSharedService) {
        this.isIConFilled = blSharedService.isIconsFilled();

        if(this.isIConFilled){
          this.customIcons.set('accessibility','ph-fill ph-person').set('archive','ph-fill ph-archive').set('arrow_down_right','ph-fill ph-arrow-down-right')
            .set('arrow_left','ph-fill ph-arrow-left').set('arrow_up','ph-fill ph-arrow-up')
            .set('dollar','ph-fill ph-currency-dollar').set('dots','ph-fill ph-dots-three')
            .set('download','ph-fill ph-download-simple').set('duplicate', 'ph-fill ph-copy-simple')
            .set('error', 'ph-fill ph-x-circle').set('euro', 'ph-fill ph-currency-eur')
            .set('file_minus', 'ph-fill ph-file-minus').set('export', 'ph-fill ph-export')
            .set('file', 'ph-fill ph-file').set('file_lock', 'ph-fill ph-file-lock')
        }
        else {
          this.customIcons.set('accessibility', 'ph ph-person').set('archive', 'ph-light ph-archive').set('arrow_down_right', 'ph ph-arrow-down-right')
            .set('arrow_left', 'ph-light ph-arrow-left').set('arrow_up', 'ph-light ph-arrow-up')
            .set('dollar', 'ph-light ph-currency-dollar').set('dots', 'ph-light ph-dots-three').set('download', 'ph-light ph-download-simple').set('duplicate', 'ph-light ph-copy-simple').set('error', 'ph-light ph-x-circle').set('euro', 'ph-light ph-currency-eur').set('file_minus', 'ph-light ph-file-minus').set('export', 'ph-light ph-export').set('file', 'ph-light ph-file').set('file_lock', 'ph-light ph-file-lock')
        }

    }

}
