import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  showFiller = false;
  hasBackdrop: boolean = true;
  links: string[] = [
    'user-profile',
    'user-profile',
    'user-profile',
    'user-profile'
  ]
  constructor() { }

  ngOnInit(): void {
  }

  showInfo(link: string) {

  }

}
