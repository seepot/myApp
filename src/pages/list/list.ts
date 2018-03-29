import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  aduan: Array<{ tarikh: string, title: string, status: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aduan = [
      { tarikh: "01/01/2018", title: "gagal mematuhi lampu isyarat merah", status: "Hantar" },
      { tarikh: "02/01/2018", title: "memotong garisan berkembar", status:"Diterima"},
      { tarikh: "04/01/2018", title: "menggunakan telefon bimbit semasa memandu", status:"Ditolak"},
      { tarikh: "21/01/2018", title: "memandu di lorong kecemasan", status: "Hantar" },
      { tarikh: "24/01/2018", title: "tidak memakai tali pinggang keledar", status: "Hantar"},
      { tarikh: "31/01/2018", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam", status: "Hantar"}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
