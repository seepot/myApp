import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController , Platform} from 'ionic-angular';
import { AddPage } from '../add/add';
import { ModalviewPage } from '../modalview/modalview';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PreloaderProvider } from '../../providers/preloader/preloader';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  kesalahan: Array<{ tarikh: string, title: string, status: string}>;
  aduanRef:AngularFireList<any>;
  aduan:Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private platform     : Platform,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: PreloaderProvider, 
    public afDatabase: AngularFireDatabase
  ) {
    this.kesalahan = [
      { tarikh: "01/01/2018", title: "gagal mematuhi lampu isyarat merah", status: "Hantar" },
      { tarikh: "02/01/2018", title: "memotong garisan berkembar", status:"Diterima"},
      { tarikh: "04/01/2018", title: "menggunakan telefon bimbit semasa memandu", status:"Ditolak"},
      { tarikh: "21/01/2018", title: "memandu di lorong kecemasan", status: "Hantar" },
      { tarikh: "24/01/2018", title: "tidak memakai tali pinggang keledar", status: "Hantar"},
      { tarikh: "31/01/2018", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam", status: "Hantar"}
    ];
    this.loadingCtrl.displayPreloader();
    //this.aduanRef = this.afDatabase.list('/aduan');
    this.aduanRef = afDatabase.list('/aduan', 
    ref => ref.orderByChild('arkib').equalTo("1"));
    this.aduan = this.aduanRef.valueChanges();
    this.loadingCtrl.hidePreloader();
  }
  /* ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.platform.ready().then(() => {
       // this.loadAduan();
      }

      );
   }

   loadAduan(){
    this.aduanRef = this.afDatabase.list('/aduan');
    this.aduan = this.aduanRef.valueChanges();
    this._LOADER.hidePreloader();
   } */

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

  public arkib(id){
    console.log(id);
    this.aduanRef.update(id, {
      arkib: "2"
    });
  }
  

 
}
