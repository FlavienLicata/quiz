import { Component, OnInit } from '@angular/core';
import { InviteParticipantModalComponent } from 'src/app/invite-participant-modal/invite-participant-modal.component'
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { QuizService } from "../services/quiz.service";
import { Quiz } from "../models/quiz";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) {
  }

  quiz: Quiz[] = [];

  ngOnInit(): void {
    this.findAllMyQuiz();
  }

  private findAllMyQuiz(): void {
    this.spinner.show();
    this.quizService.findByOwner(1).subscribe( (result) => {
      if (result) {
        this.quiz = result;
      }
    },
      error => {
        this.toast.error('Une erreur est survenue lors du chargement de vos quiz.');
      }
    )
    this.spinner.hide();
  }

  inviteParticipant(element: Quiz): void {
    this.dialog.open(InviteParticipantModalComponent, {
        width: '350px',
        height: '200px',
        data: element
      });
  }
}
