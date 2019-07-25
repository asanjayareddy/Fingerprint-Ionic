import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGaurdService],
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
