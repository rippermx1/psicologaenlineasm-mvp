import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-specialist-dashboard',
  templateUrl: './specialist-dashboard.component.html',
  styleUrls: ['./specialist-dashboard.component.scss'],
})
export class SpecialistDashboardComponent implements OnInit {
  @ViewChild('drawer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('schedule') tpl_schedule!: TemplateRef<any>;
  @ViewChild('meets') tpl_meets!: TemplateRef<any>;

  items = [
    { id: 1, name: 'schedule' },
    { id: 2, name: 'meets' },
  ];

  constructor() {}

  ngOnInit(): void {}

  loadComponent(id: number) {
    let template = null;
    this.container.clear();
    switch (id) {
      case 1:
        template = this.tpl_schedule;
        break;
      case 2:
        template = this.tpl_meets;
        break;
      default:
        break;
    }
    this.container.createEmbeddedView(template as TemplateRef<any>);
  }
}
