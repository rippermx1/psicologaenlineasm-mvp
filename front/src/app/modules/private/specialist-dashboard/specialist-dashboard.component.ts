import { Component, OnInit } from '@angular/core';
import { SPECIALIST_DASHBOARD_ROUTES } from './constants/specialist-dashboard.constant';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-specialist-dashboard',
  templateUrl: './specialist-dashboard.component.html',
  styleUrls: ['./specialist-dashboard.component.scss'],
})
export class SpecialistDashboardComponent implements OnInit {
  items = SPECIALIST_DASHBOARD_ROUTES;
  opened = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
