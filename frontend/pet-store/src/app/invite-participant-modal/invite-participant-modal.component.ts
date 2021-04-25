import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from "../models/participant";
import { Quiz } from "../models/quiz";
import { ParticipantService } from "../services/participant.service";

@Component({
  selector: 'app-invite-participant-modal',
  templateUrl: './invite-participant-modal.component.html',
  styleUrls: ['./invite-participant-modal.component.css']
})
export class InviteParticipantModalComponent implements OnInit {

   constructor(
      private formBuilder: FormBuilder,
      private participantService: ParticipantService,
      private toast: ToastrService,
      private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<InviteParticipantModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Quiz) {}

    public participant = new Participant();
    formGroup: FormGroup;

    ngOnInit(): void {
       this.createForm();
    }

    createForm() {
      this.formGroup = this.formBuilder.group({
        'email': [null, Validators.required]
      });
    }
    onSubmit(post) {
      this.participant = post;
      this.participant.quizId = this.data.id;

      this.spinner.show();
      this.participantService.save(this.data.id, this.participant).subscribe( result => {
        if (result) {
          this.spinner.hide();
          this.toast.success('L\'invitation a ' + result.email + ' a bien été envoyée', 'Success');
          this.dialogRef.close();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('Une erreur est survenue lors de l\'invitation');
      }
      );
    }
}
