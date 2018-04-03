import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { ModalviewPage } from '../modalview/modalview';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  aduan: Array<{ tarikh: string, title: string, status: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.aduan = [
      { tarikh: "01/01/2018", title: "gagal mematuhi lampu isyarat merah", status: "Hantar" },
      { tarikh: "02/01/2018", title: "memotong garisan berkembar", status:"Diterima"},
      { tarikh: "04/01/2018", title: "menggunakan telefon bimbit semasa memandu", status:"Ditolak"},
      { tarikh: "21/01/2018", title: "memandu di lorong kecemasan", status: "Hantar" },
      { tarikh: "24/01/2018", title: "tidak memakai tali pinggang keledar", status: "Hantar"},
      { tarikh: "31/01/2018", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam", status: "Hantar"}
    ];
    
  }

  

   public openModal(){ 
    //var modalPage = this.modalCtrl.create('ModalviewPage'); modalPage.present();
    let modal = this.modalCtrl.create(ModalviewPage);
    modal.present();
   }

   public closeModal(){
      this.viewCtrl.dismiss();
  }
  

 
}
