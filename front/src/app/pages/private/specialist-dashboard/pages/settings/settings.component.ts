import { Component, OnInit } from '@angular/core';
import { DEFAULT_DAYS } from '../../endpoints/settings.endpoint';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  buttons = [
    { tag: 'agenda', endpoint: DEFAULT_DAYS, name: 'setDefaultDays' },
    { tag: 'agenda', endpoint: '', name: 'Button 2' },
    { tag: 'agenda', endpoint: '', name: 'Button 3' },
    { tag: 'agenda', endpoint: '', name: 'Button 4' },
    { tag: 'agenda', endpoint: '', name: 'Button 5' },
    { tag: 'agenda', endpoint: '', name: 'Button 6' },
    { tag: 'agenda', endpoint: '', name: 'Button 7' },
    { tag: 'agenda', endpoint: '', name: 'Button 8' },
    { tag: 'agenda', endpoint: '', name: 'Button 9' },
    { tag: 'agenda', endpoint: '', name: 'Button 10' },
    { tag: 'agenda', endpoint: '', name: 'Button 11' },
  ];
  constructor(
    private service: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  handleClick(button: any) {
    switch (button.name) {
      case 'setDefaultDays':
        this.service.setDefaultDays(button.endpoint).subscribe((res: any) => {
          console.log(res);
        });
        break;

      default:
        break;
    }
  }

}
