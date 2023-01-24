import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorageListComponent } from './storage/storage-list/storage-list.component';

const routes: Routes = [
  {path: '', component: StorageListComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: "not-found"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
