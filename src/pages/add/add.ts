import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, DateTime, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ConfirmationPage } from '../confirmation/confirmation';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  imageURI:any;
  imageFileName:any;
  myDate: String = new Date().toISOString();
  currLoc: any;
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  location: {
    latitude: number,
    longitude: number
  };
  
  constructor(
    private transfer: FileTransfer,
    public viewCtrl: ViewController, formBuilder: FormBuilder,
    private geolocation: Geolocation,
    public navCtrl: NavController, 
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public toastCtrl: ToastController

  ) {
    //this.myDate = moment().
    //this.currLoc = this.geolocation.getCurrentPosition;

    this.form = formBuilder.group({
      profilePic: [''],
      tarikh: [''],
      masa: [''],
      lokasi: [''],
      nokenderaan: [''],
      catatan: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    this.findUserLocation();
  }

  // AIzaSyD3NEHKXBvN4CHaTr5FlLVZxOd61TM-glQ 

  //ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyDAQcSQAmqhj9JXGzuqyKbEKXeVKFyFypQ" --variable API_KEY_FOR_IOS="AIzaSyBEvero1rsKgBvbTehtcH2x5B51l4PExqI"
 
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }
  }

  save(){
    this.navCtrl.setRoot(ListPage);
  }

  submit(){
    this.navCtrl.push(ConfirmationPage);
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    
    
 
    this.geolocation.getCurrentPosition(options).then((position) => {
 
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  /*  getlocation(){
    let val;
    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };
    val = this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("inside func:",resp)
      
      return resp;
    });
    this.currLoc = val;
  return val;
  }

 ngOnInit(){
   this.getlocation().then(val => {
      console.log(val)
    })
  }  */

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

}
