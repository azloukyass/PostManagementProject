import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'dashbord', component:DashbordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
