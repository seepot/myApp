import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  private auth     : any;
   public movies    : any;

  constructor(public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.loadAndParseMovies();
   }

   loadAndParseMovies()
   {
      this.movies = this._DB.renderMovies();
      this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.modalCtrl.create('Modals');
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }


   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create('Modals', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }



   deleteMovie(movie)
   {
      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
         this.loadAndParseMovies();
      });
   }

}
