import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { AuthenticationService } from './services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import { AppUtilService } from './services/app-util.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGaurdService,
    AuthenticationService,
    AppUtilService,
    FingerprintAIO
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
