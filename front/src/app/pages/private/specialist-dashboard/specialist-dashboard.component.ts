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
  @ViewChild('meets')    tpl_meets!: TemplateRef<any>;
  @ViewChild('pacients') tpl_pacients!: TemplateRef<any>;
  @ViewChild('dte')      tpl_dte!: TemplateRef<any>;
  

  items = [
    { id: 1, icon: 'date_range', name: 'Agenda' },
    { id: 2, icon: 'date_range', name: 'Citas' },
    { id: 3, icon: 'date_range', name: 'Pacientes' },
    { id: 4, icon: 'date_range', name: 'Boletas' },
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
      case 3:
        template = this.tpl_pacients;
        break;
      case 4:
        template = this.tpl_dte;
        break;
      default:
        break;
    }
    this.container.createEmbeddedView(template as TemplateRef<any>);
  }
}
