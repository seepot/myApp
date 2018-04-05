import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';
import { AddPage } from '../pages/add/add';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DrafPage } from '../pages/draf/draf';
import { ArkibPage } from '../pages/arkib/arkib';
import { InboxPage } from '../pages/inbox/inbox';
import { SigninPage } from '../pages/signin/signin';
import { Form1Page } from '../pages/form1/form1';

import { ProfilPage } from '../pages/profil/profil';
import { WelcomePage } from '../pages/welcome/welcome';
import { initializeApp } from 'firebase';

import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../models/user";
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
})
export class MyApp {

  @ViewChild(Nav) nav : Nav;
  rootPage:any = WelcomePage;
  activePage: any;
  //user = {} as User;
  pages: Array<{icon: string, title: string, component: any}>;
  private user: firebase.User;

  constructor(public platform: Platform, private afAuth: AngularFireAuth,){
    this.initializeApp();

    this.pages = [
      { icon: 'bookmark', title: 'Aduan Baru', component: HomePage },
      { icon: 'bookmark', title: 'Draf', component: DrafPage },
      { icon: 'bookmark', title: 'Dihantar', component: ListPage },
      { icon: 'bookmark', title: 'Arkib', component: ArkibPage },
      { icon: 'bookmark', title: 'Peti Masuk', component: InboxPage },
      { icon: 'bookmark', title: 'Profile', component: ProfilPage },
      { icon: 'bookmark', title: 'Log Keluar', component: WelcomePage }
    ];

    this.activePage = this.pages[0];

    //console.log(this.user.email);
  }
  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    //Statusbar.styleDefault();
    });

    this.afAuth.authState.subscribe(user => {
          this.user = user;
    });

    this.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = WelcomePage;
        }
      },
      () => {
        this.rootPage = WelcomePage;
      }
);
  }

  openPage(page) {
    // navigate to the new page if it is not the current page
    //this.navCtrl.push(LoginPage);
    
    
    this.activePage = page;

    if(page.title == 'Log Keluar'){
      this.afAuth.auth.signOut();
      this.activePage = "";
    }
    this.nav.setRoot(page.component);
  }


  checkActive(page) {
    return page == this.activePage;
  }

  getUser(){
    return this.user && this.user.email;
  }
  
}
