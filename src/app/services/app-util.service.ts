import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AppUtilService {

  private loadingElement: any;

  constructor( private alertCtrl: AlertController, private loadingController: LoadingController,
               private fingerPrintAIO: FingerprintAIO, private storage: Storage) { }

  async presentLoading() {
    this.loadingElement = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    return await this.loadingElement.present();
  }
  async dismissLoading() {
    console.log('loading dismissed');
    return await this.loadingElement.dismiss();
  }

  showAlert(header: string, message: string) {
    let alert = this.alertCtrl
    .create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    })
    .then(arltElem => arltElem.present());
  }

  presentFingerPrint() {
    return this.fingerPrintAIO.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only necessary for Android
      disableBackup: false, // Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', // Only for iOS
      localizedReason: 'Please authenticate' // Only for iOS
    });
  }

  async isFingerprintAvailable() {
    let result = false;
    const promise = await this.fingerPrintAIO.isAvailable();
    promise.then((response) => {
        result = true;
        console.log('fingerprint available : ', response);
       });
    promise.catch((error) => {
         result  = false;
         console.log('fingerprint error : ', error);
       });
    return result;
  }


}
