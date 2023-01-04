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
  /* {
    path:'enrollment',
    loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  {
    path:'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  }, */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
