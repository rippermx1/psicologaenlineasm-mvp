import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/public/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'schedule-meet',
    loadChildren: () => import('./pages/public/schedule-meet/schedule-meet.module').then(m => m.ScheduleMeetModule)
  }, 
  {
    path: 'user',
    loadChildren: () => import('./pages/private/patient-dashboard/patient-dashboard.module').then(m => m.PatientDashboardModule)
  },
  {
    path: 'specialist',
    loadChildren: () => import('./pages/private/specialist-dashboard/specialist-dashboard.module').then(m => m.SpecialistDashboardModule)
  }, 
  
  /* {
    path: 'meet-room',
    loadChildren: () => import('./pages/private/meet-room/meet-room.module').then(m => m.MeetRoomModule)
  }, */
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
