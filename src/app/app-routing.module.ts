import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjetComponent } from './projet/projet.component';
import { BoardComponent } from './board/board.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamListComponent } from './team-list/team-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  


  { path: '', redirectTo: '/projet', pathMatch: 'full' },
  { path: 'team', component: TeamListComponent },
  { path: 'projet', component: ProjetComponent },
  { path :'Profil', component: UserProfileComponent },
  {path:'',component:ProjetComponent},
  {path:'board/:id',component: BoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
