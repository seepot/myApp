import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-test1',
  templateUrl: 'test1.html',
})
export class Test1Page {

  //songs: AngularFireList<any>;

  songsRef:AngularFireList<any>;
  songs:Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    afDatabase: AngularFireDatabase
  ) {
    //this.songs = afDatabase.list('/songs').valueChanges();
    //this.songs = afDatabase.list('/songs').valueChanges();

    this.songsRef = afDatabase.list('/songs');
    this.songs = this.songsRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Test1Page');
  }

  addSong(){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          const newSongRef = this.songsRef.push({});
 
          newSongRef.set({
            id: newSongRef.key,
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}
showOptions(songId, songTitle) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Song',
        role: 'destructive',
        handler: () => {
          this.removeSong(songId);
        }
      },{
        text: 'Update title',
        handler: () => {
          this.updateSong(songId, songTitle);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeSong(songId: string){
  this.songsRef.remove(songId);
}

updateSong(songId, songTitle){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Update the name for this song",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: songTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songsRef.update(songId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

}
