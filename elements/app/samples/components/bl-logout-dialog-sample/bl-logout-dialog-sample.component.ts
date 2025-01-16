import {Component, EventEmitter, OnInit} from '@angular/core';
import { BlLabelCounterState, BlLabelState, BubbleSize, IconClassEnum } from '@esedit-md/shared-ui';
import { BlInterceptorLogoutService } from '../../../../../../../libs/shared-ui/src/lib/services/logout/bl-interceptor-logout.service';
import { ToasterService } from '@bl/shared';
import {
  BlLogoutDialogComponent
} from "../../../../../../../libs/shared-ui/src/lib/components/style/bl-logout-dialog/bl-logout-dialog.component";

@Component({
  templateUrl: './bl-logout-dialog-sample.component.html',
  selector: 'bl-logout-dialog-sample'
})
export class BlLogoutDialogSampleComponent implements OnInit{


  succesState = BlLabelCounterState.SUCCESS;
  tokenValue = 30;
  displayDialogTimeValue = this.tokenValue - 5;
  primaryState = BlLabelState.SUCCESS;
  primaryValue = 'La valeur du token est suprérieur du temps d\'affichage du dialog :)';
  clockIcon = IconClassEnum.timer_fill;
  large = BubbleSize.L;
  buttonTitle = 'Activer';
   interceptorCode;
  isContentMaskEnabled = false;

  constructor(private timerService: BlInterceptorLogoutService, private toasterService: ToasterService) {
    this.interceptorCode =' intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n' +
      '   this.timerService.resetTimer();\n' +
      '   return next.handle(req)\n' +
      '  }'
  }
  ngOnInit() {
    const currentValue = localStorage.getItem('displayLogout') === 'true';
    this.buttonTitle = currentValue ? 'Déactiver' : 'Activer';
  }

  adaptDisplayDialogValue() {
    this.displayDialogTimeValue > this.tokenValue
      ? this.displayDialogTimeValue = this.tokenValue - 5
      : this.displayDialogTimeValue;
  }

  adaptDisplayTokenValue() {
    this.displayDialogTimeValue > this.tokenValue
      ? this.tokenValue = this.displayDialogTimeValue + 5
      : this.tokenValue;
  }

  openLogOutDialog() {
    const currentValue = localStorage.getItem('displayLogout') === 'true';
    BlLogoutDialogComponent.hideContent = this.isContentMaskEnabled;
    if (!currentValue) {
      this.timerService.initializeTimer(this.tokenValue, this.displayDialogTimeValue); // give the validity of token and the time to display the dialog for the user in order to relog
      this.buttonTitle = 'Déactiver';
      this.timerService._titleShouldConnect = 'Votre session va expirer dans :';
      this.timerService._submitShouldConnectText = 'Continuer';
      this.timerService._cancelShouldConnectText = 'Fermer';
      this.timerService._logoutTitle = 'Votre session a expiré car vous êtes resté inactif pendant 10 minutes';
      this.timerService._logoutButtonText = 'Se connecter';
     //define your buttons
      //** those first buttons are displayed in the first Dialog  **/
      const successEvent = new EventEmitter();
      const cancelEvent = new EventEmitter();
      //** When  token time is over we define the button of login and (optionally) the close icon event   **/
      //const exitEvent = new EventEmitter();
      const connectEvent = new EventEmitter();

      //exitEvent.subscribe(() => this.toasterService.error('Vous devez vous authentifier'));
      successEvent.subscribe(() => this.toasterService.success('Success'));
      cancelEvent.subscribe(() => this.toasterService.success('Cancelled'));
      connectEvent.subscribe(() => {
        this.toasterService.warning('Vous êtes reconnecté');
        this.timerService.resetTimer();
        this.toasterService.success('localStorage Item timerState is created');
      });

      this.timerService.continueEventEmitter = successEvent;
      this.timerService.cancelEventEmitter = cancelEvent;
      //this.timerService.exitEventEmitter = exitEvent;
      this.timerService.connectEventEmitter = connectEvent;

      localStorage.setItem('displayLogout', 'true');
    } else {

      this.timerService.destroyTokenTime(); // Remove token from localStorage
      this.buttonTitle = 'Activer';
      localStorage.setItem('displayLogout', 'false');
    }
  }
}
