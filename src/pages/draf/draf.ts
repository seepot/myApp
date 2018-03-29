import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-draf',
  templateUrl: 'draf.html',
})
export class DrafPage {

  aduan: Array<{ tarikh: string, title: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aduan = [
      { tarikh: "01/01/2018", title: "gagal mematuhi lampu isyarat merah"},
      { tarikh: "02/01/2018", title: "memotong garisan berkembar"},
      { tarikh: "04/01/2018", title: "menggunakan telefon bimbit semasa memandu"},
      { tarikh: "21/01/2018", title: "memandu di lorong kecemasan"},
      { tarikh: "24/01/2018", title: "tidak memakai tali pinggang keledar"},
      { tarikh: "31/01/2018", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam"}
    ];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DrafPage');
  }

}
