import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetRoomRoutingModule } from './meet-room-routing.module';
import { VideoComponent } from './pages/video/video.component';
import { ChatComponent } from './pages/chat/chat.component';


@NgModule({
  declarations: [
    VideoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MeetRoomRoutingModule
  ]
})
export class MeetRoomModule { }
