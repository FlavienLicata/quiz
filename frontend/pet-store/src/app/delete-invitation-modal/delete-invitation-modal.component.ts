import { Component, Inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Participant } from "../models/participant";
import { ParticipantService } from "../services/participant.service";

@Component({
  selector: 'app-delete-invitation-modal',
  templateUrl: './delete-invitation-modal.component.html'
})
export class DeleteInvitationModalComponent {

  constructor(
    private participantService: ParticipantService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<DeleteInvitationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant) {}

  delete() {
    this.spinner.show();
    this.participantService.delete(this.data.id).subscribe( result => {
     if (result) {
       this.spinner.hide();
       this.toast.success('L\'invitation a bien été supprimée', 'Success');
       this.dialogRef.close(this.data);
     }
   },
   error => {
     this.spinner.hide();
     this.toast.error('Une erreur est survenue lors de la suppression de l\'invitation');
   }
   );
  }

}
