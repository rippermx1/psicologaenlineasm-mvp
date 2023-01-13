import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'schedule-meet',
    loadChildren: () => import('./pages/public/schedule-meet/schedule-meet.module').then(m => m.ScheduleMeetModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/public/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/private/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'specialist-dashboard',
    loadChildren: () => import('./pages/private/specialist-dashboard/specialist-dashboard.module').then(m => m.SpecialistDashboardModule)
  },
  /* {
    path:'enrollment',
    loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  {
    path:'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  }, */
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
