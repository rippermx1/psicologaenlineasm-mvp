import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JitsiService } from '../../service/jitsi.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  isAudioMuted: boolean = false;
  constructor(
    private router: Router, 
    private jitsiService: JitsiService) {}

  ngOnInit(): void {
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, true);
  }

  executeCommand(data: any) {
    console.log(
      'this.jitsiService.getParticipants():',
      this.jitsiService.getParticipants()
    );

    this.jitsiService.api.executeCommand(
      'sendEndpointTextMessage',
      this.jitsiService.getParticipants(),
      'mover a principal'
    );
  }
}
