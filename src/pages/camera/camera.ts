import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddPage } from '../add/add';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

aduan(){
  this.navCtrl.push(AddPage);
}
  

}
