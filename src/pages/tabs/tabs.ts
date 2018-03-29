import { Component } from '@angular/core';

import { PicturePage } from '../picture/picture';
import { CameraPage } from '../camera/camera';
import { VideoPage } from '../video/video';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PicturePage;
  tab2Root = CameraPage;
  tab3Root = VideoPage;

  constructor() {

  }
}
