import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AngularFireAuth]
})
export class SignupPage {

  user = {} as User;
  userRef:AngularFireList<any>;
  user1:Observable<any[]>;
  
  constructor(private afAuth: AngularFireAuth, afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.userRef = afDatabase.list('/user');
      this.user1 = this.userRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  /* signup(){
    this.navCtrl.push(TabsPage);
  } */

  async signup(user: User){
    this.userRef.set(user.mykad,{
        emel: user.email,
        nama: user.nama,
        mykad: user.mykad
      });
      
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
