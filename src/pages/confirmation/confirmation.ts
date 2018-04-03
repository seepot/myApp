import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrafPage } from '../draf/draf';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  myDate: String = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  save(){
    this.navCtrl.setRoot(DrafPage);
  }

  submit(){
    this.navCtrl.setRoot(ListPage);
  }

}
