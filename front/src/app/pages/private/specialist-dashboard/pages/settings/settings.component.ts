import { Component, OnInit } from '@angular/core';
import { DEFAULT_DAYS } from '../../endpoints/settings.endpoint';
import { MeetsService } from '../../service/meets.service';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  buttonsSchedule = [
    { tag: 'agenda', endpoint: DEFAULT_DAYS, name: 'setDefaultDays' },
    { tag: 'agenda', endpoint: '', name: 'Button 2' },
    { tag: 'agenda', endpoint: '', name: 'Button 3' }
  ];
  buttonsMeet = [
    { tag: 'citas', endpoint: '', name: 'CitasGenericas' },
    { tag: 'citas', endpoint: '', name: 'Button 2' },
    { tag: 'citas', endpoint: '', name: 'Button 3' }
  ];
  constructor(
    private service: SettingsService,
    private meetService: MeetsService
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
      case 'CitasGenericas':
        /* this.meetService.setDefaultDays(button.endpoint).subscribe((res: any) => {
          console.log(res);
        }); */
        break;
      default:
        break;
    }
  }

}
