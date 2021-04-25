import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { ParticipantService } from "../services/participant.service";
import { Participant } from "../models/participant";
import { DeleteInvitationModalComponent } from "../delete-invitation-modal/delete-invitation-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-pending-invitations',
  templateUrl: './pending-invitations.component.html',
  styleUrls: ['./pending-invitations.component.css']
})
export class PendingInvitationsComponent implements OnInit {

  constructor(
    private participantService: ParticipantService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toast: ToastrService) {

  }

  pendingParticipants: Participant[] = [];
  displayedColumns: string[] = ['email', 'invitationDate', 'relanceDate', 'action'];
  dataSource = new MatTableDataSource<Participant>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.findPendingInvitationsByQuiz(id);
  }

  private findPendingInvitationsByQuiz(id: number): void {
    this.spinner.show();
    this.participantService.findPendingParticipantsByQuizId(id).subscribe( (result) => {
        if (result) {
          this.pendingParticipants = result;
          this.dataSource = new MatTableDataSource<Participant>(this.pendingParticipants);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('Une erreur est survenue lors du chargement des invitations en attente');
      }
    )
  }

  resendInvitation(participant: Participant) : void {
    this.spinner.show();
    this.participantService.resendInvitation(participant).subscribe( result => {
        if (result) {
          const indexParticipant = this.dataSource.filteredData.indexOf(participant);
          this.pendingParticipants.splice(indexParticipant, 1, result);
          this.dataSource = new MatTableDataSource<Participant>(this.pendingParticipants);
          this.spinner.hide();
          this.toast.success('Un rappel de l\'invitation à ' + result.email + ' à bien été envoyée!', 'Succès');
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('Une erreur est survenue durant l\'envoi du rappel de l\'invitation');
      }
    );
  }

  delete(participant: Participant): void {
    const dialogRef = this.dialog.open(DeleteInvitationModalComponent, {
      width: '250px',
      data: participant
    });

    dialogRef.afterClosed().subscribe((participant) => {
      if (participant) {
        const indexParticipant = this.dataSource.filteredData.indexOf(participant);
        this.pendingParticipants.splice(indexParticipant, 1);
        this.dataSource = new MatTableDataSource<Participant>(this.pendingParticipants);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
