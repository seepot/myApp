import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavController } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddPage } from '../pages/add/add';
import { ListPage } from '../pages/list/list';
import { CameraPage } from '../pages/camera/camera';
import { RegisterPage } from '../pages/register/register';
import { PasswordPage } from '../pages/password/password';
import { Option1Page } from '../pages/option1/option1';
import { PicturePage } from '../pages/picture/picture';
import { VideoPage } from '../pages/video/video';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { DrafPage } from '../pages/draf/draf';
import { ArkibPage } from '../pages/arkib/arkib';
import { InboxPage } from '../pages/inbox/inbox';
import { ProfilPage } from '../pages/profil/profil';
import { ModalviewPage } from '../pages/modalview/modalview';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { MapsProvider } from '../providers/maps/maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddPage,
    ListPage,
    CameraPage,
    RegisterPage,
    SigninPage,
    PasswordPage,
    Option1Page,
    PicturePage,
    VideoPage,
    ConfirmationPage,
    DrafPage,
    ArkibPage,
    InboxPage,
    ProfilPage,
    ModalviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddPage,
    ListPage,
    CameraPage,
    RegisterPage,
    SigninPage,
    PasswordPage,
    Option1Page,
    PicturePage,
    VideoPage,
    ConfirmationPage,
    DrafPage,
    ArkibPage,
    InboxPage,
    ProfilPage,
    ModalviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    FileTransferObject,
    File,
    Geolocation,
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider
  ]
})
export class AppModule {
  
}
