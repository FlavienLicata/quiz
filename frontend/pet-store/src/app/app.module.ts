import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeComponent } from "./home/home.component";
import { PendingInvitationsComponent } from "./pending-invitations/pending-invitations.component";
import { ResultsStatsComponent } from "./results-stats/results-stats.component";
import { InviteParticipantModalComponent } from "./invite-participant-modal/invite-participant-modal.component";
import { DeleteInvitationModalComponent } from "./delete-invitation-modal/delete-invitation-modal.component";
import { StartQuizComponent } from "./start-quiz/start-quiz.component";
import { ResultModalComponent } from "./result-modal/result-modal.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { CommonComponentsModule } from "./common-components/common-components.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    InviteParticipantModalComponent,
    DeleteInvitationModalComponent,
    HomeComponent,
    PendingInvitationsComponent,
    ResultsStatsComponent,
    StartQuizComponent,
    ResultModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgxSpinnerModule,
    NgbModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatGridListModule,
    CommonComponentsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
