import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AngularFireAuth]
})
export class SignupPage {

  user = {} as User;
  
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  /* signup(){
    this.navCtrl.push(TabsPage);
  } */

  async signup(user: User){
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);

      this.afAuth.auth.currentUser.sendEmailVerification();
      //var auth = firebase.auth();
      //this.afAuth.auth.
      this.navCtrl.setRoot(WelcomePage);

    }
    catch (e) {
      console.error(e);
    }
  } 
}
