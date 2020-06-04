import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetComponent } from './pet/pet.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { FindComponent } from './find/find.component';

const routes: Routes = [
  { path: '', component: PetComponent },
  { path: 'home', component: PetComponent },
  { path: 'add-pet', component: AddPetComponent },
  { path: 'find', component: FindComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
