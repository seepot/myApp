import { Component } from '@angular/core';
import { NavController, ToastController, Tabs, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private afAuth: AngularFireAuth, 
    private toastCtrl: ToastController, private camera: Camera,
    public platform: Platform,  public actionsheetCtrl: ActionSheetController,
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
  camera1(){
    this.navCtrl.push(CameraPage);
  }

  salah1(){
    this.navCtrl.push(Option1Page);
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      cssClass: 'alertCustomCss',
      title: 'upload dari?',
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

  takePhoto(sourceType){
    const options : CameraOptions = {
      quality: 100, // picture quality
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        console.log(this.photos);
   
      }, (err) => {
        console.log(err);
        this.presentToast('Error while selecting image.');
      });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
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
   let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    } */
  }

  openMenu(id) {
    console.log(id);
    let data = { id: id };
    console.log(data);
    let actionSheet = this.actionsheetCtrl.create({
      //title: 'Albums',
      
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Form',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.navCtrl.push(AddPage,id);
          }
        },
        {
          text: 'Add Photo / Video',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          icon: !this.platform.is('ios') ? 'md-camera' : null,
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Take Video',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            //this.takePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,  

          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
