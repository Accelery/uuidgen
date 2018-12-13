import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Uuidv4Component } from './uuid/uuidv4/uuidv4.component';

const routes: Routes = [
  { path: 'v4', component: Uuidv4Component },
  { path: '', redirectTo: '/v4', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
