import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/components/home/home.component';
import { CharacterDetailsComponent } from './shared/components/character-details/character-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:name', component: CharacterDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
