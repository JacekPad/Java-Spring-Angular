import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorageRoutingModule } from './storage/storage-routing.module';

const routes: Routes = [
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: "not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), StorageRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
