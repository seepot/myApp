import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ModalviewPage } from '../modalview/modalview';
import { PreloaderProvider } from '../../providers/preloader/preloader';

@IonicPage()
@Component({
  selector: 'page-arkib',
  templateUrl: 'arkib.html',
})
export class ArkibPage {

  kesalahan: Array<{ tarikh: string, title: string}>;
  aduanRef:AngularFireList<any>;
  aduan:Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public loadingCtrl: PreloaderProvider, 
    public navParams: NavParams,
    public afDatabase: AngularFireDatabase) {

    this.kesalahan = [
      { tarikh: "01/01/2018", title: "gagal mematuhi lampu isyarat merah"},
      { tarikh: "02/01/2018", title: "memotong garisan berkembar"},
      { tarikh: "04/01/2018", title: "menggunakan telefon bimbit semasa memandu"},
      { tarikh: "21/01/2018", title: "memandu di lorong kecemasan"},
      { tarikh: "24/01/2018", title: "tidak memakai tali pinggang keledar"},
      { tarikh: "31/01/2018", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam"}
    ];

    this.loadingCtrl.displayPreloader();
    this.aduanRef = afDatabase.list('/aduan', 
    ref => ref.orderByChild('arkib').equalTo("2"));
    this.aduan = this.aduanRef.valueChanges();
    this.loadingCtrl.hidePreloader();
  }
  getKesalahanById(id){
    if (id == "1"){
      return "gagal mematuhi lampu isyarat merah";
    } else if (id == "2"){
      return "memotong garisan berkembar";
    } else if (id == "3"){
      return "menggunakan telefon bimbit semasa memandu";
    }  else if (id == "4"){
      return "memandu di lorong kecemasan";
    }  else if (id == "5"){
      return "tidak memakai tali pinggang keledar";
    } else if (id == "6"){
      return "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam";
    } else {
      return "error";
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArkibPage');
  }

  public openModal(key){ 
    //var modalPage = this.modalCtrl.create('ModalviewPage'); modalPage.present();
    console.log(key);
    let data = {key: key};
    let modal = this.modalCtrl.create(ModalviewPage, data);
    modal.present();
   }

   public closeModal(){
      this.viewCtrl.dismiss();
  }

}
