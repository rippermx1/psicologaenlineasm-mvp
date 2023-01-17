import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef  } from '@angular/core';

@Component({
  selector: 'app-specialist-dashboard',
  templateUrl: './specialist-dashboard.component.html',
  styleUrls: ['./specialist-dashboard.component.scss'],
})
export class SpecialistDashboardComponent implements OnInit {
  @ViewChild('drawer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('template') template!: TemplateRef<any>;


  constructor() {}

  ngOnInit(): void {}

  loadComponent(link: string) {
    this.container.clear();
    this.container.createEmbeddedView(this.template);
  }
}
