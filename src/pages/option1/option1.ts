import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-option1',
  templateUrl: 'option1.html',
})
export class Option1Page {

  pet: string = "puppies";
  isAndroid: boolean = false;

  public photos : any;
  public base64Image : string;

  constructor(public navCtrl: NavController,
    private camera : Camera, public navParams: NavParams, platform: Platform) {
    this.isAndroid = platform.is('android');
}

ngOnInit() {
  this.photos = [];
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Option1Page');
  }

  takePhoto(){
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

}
