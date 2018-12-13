import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UuidComponent } from './uuid/uuid/uuid.component';

const routes: Routes = [
  { path: 'v/:version', component: UuidComponent },
  { path: '', redirectTo: '/v/4', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
