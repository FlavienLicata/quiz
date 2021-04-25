import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PendingInvitationsComponent } from "./pending-invitations/pending-invitations.component";
import { ResultsStatsComponent } from "./results-stats/results-stats.component";
import { StartQuizComponent } from "./start-quiz/start-quiz.component";

const routes: Routes = [
  { path: 'app/home', component: HomeComponent },
  { path: 'app/quiz/:id/pending-invitations', component: PendingInvitationsComponent },
  { path: 'app/start-quiz/:token', component: StartQuizComponent },
  { path: 'app/quiz/:id/statistics', component: ResultsStatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
