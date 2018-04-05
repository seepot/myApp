import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import { PasswordPage } from '../password/password';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [AngularFireAuth]
})
export class SigninPage {

  user = {} as User;
  loginError: string;

  constructor(public navCtrl: NavController, 
    private afAuth: AngularFireAuth,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  login(user: User){
    /* try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
       // this.navCtrl.setRoot(HomePage);
      } else {
        console.log('tiada akses');
      }
    }
    catch (e) {
      console.error(e);
    } */

		this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
      );
  }

  forgotpswd(){
    this.navCtrl.push(PasswordPage);
  }


}
