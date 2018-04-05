import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrafPage } from '../draf/draf';
import { ListPage } from '../list/list';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  id: any;
  kesalahan: any;
  tarikh: String;
  masa: String;
  lokasi: String;
  nokenderaan: String;
  catatan: String;
  aduanRef:AngularFireList<any>;
  aduan:Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    afDatabase: AngularFireDatabase) {
      this.aduanRef = afDatabase.list('/aduan');
      this.aduan = this.aduanRef.valueChanges();

  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
    console.log(this.navParams.data);
    console.log(this.navParams.get('id'));

   // let data = { data: this.navParams.get('data')};
    this.id = this.navParams.get('id');
    this.kesalahan = this.getKesalahanById(this.id);
    this.tarikh = this.navParams.get('data').tarikh;
    this.masa = this.navParams.get('data').masa;
    this.lokasi = this.navParams.get('data').lokasi;
    this.nokenderaan = this.navParams.get('data').nokenderaan;
    this.catatan = this.navParams.get('data').catatan;

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

  save(){
    this.navCtrl.setRoot(DrafPage);
  }

  submit(){
    const newAduan = this.aduanRef.push({});
 
    newAduan.set({
      id: newAduan.key,
      idkesalahan: this.id,
      tarikh: this.tarikh,
      masa: this.masa,
      lokasi: this.lokasi,
      nokenderaan: this.nokenderaan,
      catatan: this.catatan,
      status: "Hantar",
      arkib: "1"
    });

    this.navCtrl.setRoot(ListPage);
  }

}
