import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable'
import { User } from '../../models/user';
import * as firebase from 'firebase/app';
import { PreloaderProvider } from '../../providers/preloader/preloader';

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  private user: firebase.User;
  userRef:AngularFireList<any>;
  user1:Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public afDatabase: AngularFireDatabase,
    public platform: Platform,
    public loadingCtrl: PreloaderProvider, 
    private afAuth: AngularFireAuth,
    public navParams: NavParams) {
      //console.log(this.user);
      //this.userRef = afDatabase.list('/user');
      //this.user1 = this.userRef.valueChanges();
      //console.log(this.user1);
      this.loadingCtrl.displayPreloader();
      this.afAuth.authState.subscribe(user => {
        this.user = user;

        console.log(this.user.email);
        this.userRef = this.afDatabase.list('/user',
        ref => ref.orderByChild('emel').equalTo(this.user.email));
        this.user1 = this.userRef.valueChanges();
        console.log(this.user1);
        this.loadingCtrl.hidePreloader();
      });
      
      
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    //Statusbar.styleDefault();
    });

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  edit(){
    this.navCtrl.push(EditprofilePage);
    //console.log('aaa');
  }
}
