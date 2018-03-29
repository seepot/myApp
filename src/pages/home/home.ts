import { Component } from '@angular/core';
import { NavController, ToastController, Tabs, AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { AddPage } from '../add/add';
import { CameraPage } from '../camera/camera';
import { VideoPage } from '../video/video';
import { PicturePage } from '../picture/picture';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { Option1Page } from '../option1/option1';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  public photos : any;
  public base64Image : string;

  kesalahan: Array<{ id: string, title: string}>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, private camera1: Camera,
    public navCtrl: NavController, public alertCtrl: AlertController) {

      this.kesalahan = [
        { id: "1", title: "gagal mematuhi lampu isyarat merah"},
        { id: "2", title: "memotong garisan berkembar"},
        { id: "3", title: "menggunakan telefon bimbit semasa memandu"},
        { id: "4", title: "memandu di lorong kecemasan"},
        { id: "5", title: "tidak memakai tali pinggang keledar"},
        { id: "6", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam"}
      ];
  }

  ngOnInit() {
    this.photos = [];
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  add(){
    this.navCtrl.push(AddPage);
  }
  camera(){
    this.navCtrl.push(CameraPage);
  }

  salah1(){
    this.navCtrl.push(Option1Page);
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      cssClass: 'alertcss',
      buttons: [
        {
          text: 'Photo',
          handler: data => {
            this.navCtrl.push(AddPage);
          }
        },
        {
          text: 'Camera',
          handler: data => {
            this.navCtrl.push(CameraPage);
          }
        },
        {
          text: 'Video',
          handler: data => {
            this.navCtrl.push(VideoPage);
          }
        }
      ]
    });
    prompt.present();
  }

  takePhoto(){
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera1.DestinationType.DATA_URL,
      encodingType: this.camera1.EncodingType.JPEG,
      mediaType: this.camera1.MediaType.PICTURE
    }
    this.camera1.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    
    /* this.afAuth.authState.subscribe( data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message : `Welcome to APP_NAME, ${data.email}`,
          duration : 3000
        }).present();
      }
      else
      {
        this.toast.create({
          message : `Could not find authentication details`,
          duration : 3000
        }).present();
      }
    })
 */
    /* let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    } */
  }
}
