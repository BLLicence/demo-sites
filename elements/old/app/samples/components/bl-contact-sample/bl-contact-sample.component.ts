import { Component, EventEmitter } from '@angular/core';
import { ToasterService } from '@bl/shared';
import { BlAction } from '@esedit-md/shared-ui';
import { TranslateService } from '@ngx-translate/core';
import { ContactModel } from 'libs/shared-ui/src/lib/models/bl-contact/Contact.model';


@Component({
  selector: 'bl-contact-sample',
  templateUrl: './bl-contact-sample.component.html',
  styleUrls: ['./bl-contact-sample.component.scss'],
})
export class BlContactSampleComponent {
  myActionsList: BlAction[] = [];
  public FullContact: ContactModel = {
    firstName: "Marie",
    lastName: "Dupont",
    town: "Paris",
    email: "marie.dupont.marketing@berger-levrault.com",
    phoneNumber: "0626842296"
  };
  public NameOnly: ContactModel = {
    firstName: "Annie",
    lastName: "Biau",

  };
  public LongNameContact: ContactModel = {
    firstName: "Jean-Baptiste-Marie-Antoine",
    lastName: "Dupont de Lavoisier",
    town: "Paris",
    email: "jean.batptiste@berger-levrault.com",
    phoneNumber: "0626842296"
  };

  public constructor(public toasterService: ToasterService,
    private translateService: TranslateService,
  ) {


    this.myActionsList.push(
      {
        label: this.translateService.instant('bl-contact.actions.delete'),
        eventEmitter: new EventEmitter()
      })

    this.myActionsList.push(
      {
        label: this.translateService.instant('bl-contact.actions.duplicate'),
        eventEmitter: new EventEmitter()
      })
    this.myActionsList.push(
      {
        label: this.translateService.instant('bl-contact.actions.add-favorites'),
        eventEmitter: new EventEmitter()
      })
    this.myActionsList.push(
      {
        label: this.translateService.instant('bl-contact.actions.update'),
        eventEmitter: new EventEmitter()
      })

  }

  emitClickEvent($event) {
    this.toasterService.success('button + clicked');
  }

  emitClickCheckButtonEvents($event) {
    this.toasterService.success('button valide');
  }

  emitClickUpdateButtonEvents($event) {
    this.toasterService.success('update button clicked');
  }



}
