import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { ParticipantService } from "../services/participant.service";
import { QuestionService } from "../services/question.service";
import { QuizService } from "../services/quiz.service";
import { Quiz } from "../models/quiz";
import { Question } from "../models/question";
import { Answer } from "../models/answer";
import { ParticipantAnswer } from "../models/participantAnswer";
import { AnswerService } from "../services/answer.service";
import { ParticipantAnswerService } from "../services/participantAnswer.service";
import { Participant } from "../models/participant";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ResultModalComponent } from "../result-modal/result-modal.component";

@Component({
  selector: 'app-results-stats',
  templateUrl: './results-stats.component.html',
  styleUrls: ['./results-stats.component.css']
})
export class ResultsStatsComponent implements OnInit {

  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  quiz: Quiz;
  questions: Question[];
  answers: Answer[];
  participants: Participant[];
  participantsAnswers: ParticipantAnswer[] = [];
  nbQuestion: number = 0;
  nbReponses: number = 0;
  averageTimeMinutes: number = 0;
  averageTimeSeconds: number = 0;
  averageCompletion: number = 0;
  averageSuccess: number = 0;
  score: number[] = [];
  displayedColumns: string[] = ['name', 'email', 'participationDate', 'time', 'score', 'action'];
  dataSource = new MatTableDataSource<Participant>();
  resultsStats: any[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private participantService: ParticipantService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private participantAnswerService: ParticipantAnswerService,
    private quizService: QuizService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toast: ToastrService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.findParticipationByParticipationDate(id);
    this.getQuiz(id);
    this.getNbQuestions(id);
    this.getAverageTime(id);
    this.getAverageCompletion(id);
    this.getAverageSuccess(id);
    this.getQuestions(id);
    this.getAnswers(id);
    this.getParticipants(id);
  }

  private findParticipationByParticipationDate(id: number): void {
    this.spinner.show();
    this.participantService.countParticipationByParticipationDate(id).subscribe( (result) => {
        if (result) {
          let data = [];
          result.map( (x) => {
            this.nbReponses += x[1];
            data.push(x[1]);
            this.chartLabels.push(x[0]);
          });
          this.chartDatasets.push({data: data, label: 'Historique des réponses'});
        }
      },
      error => {
        this.toast.error('An error occured when charging data');
      }
    )
    this.spinner.hide();
  }

  private getQuiz(id: number): void {
    this.quizService.findById(id).subscribe( (quiz) => {
      if (quiz) {
        this.quiz = quiz;
      }
    });
  }

  private getNbQuestions(id: number): void {
    this.questionService.countQuestionByQuizId(id).subscribe((nbQuestion) => {
      if (nbQuestion) {
        this.nbQuestion = nbQuestion;
      }
    });
  }

  private getAverageTime(id: number): void {
    this.participantService.getAverageTime(id).subscribe((averageTime) => {
      if (averageTime) {
        const minutes = Math.floor(averageTime / 60);
        this.averageTimeMinutes = minutes;
        this.averageTimeSeconds = averageTime - minutes * 60;
      }
    });
  }

  private getAverageCompletion(id: number): void {
    this.participantService.getAverageCompletion(id).subscribe((averageCompletion) => {
      if (averageCompletion) {
        this.averageCompletion = averageCompletion;
      }
    });
  }

  private getAverageSuccess(id: number): void {
    this.participantService.getAverageSuccess(id).subscribe((averageSuccess) => {
      if (averageSuccess) {
        this.averageSuccess = averageSuccess;
      }
    });
  }

  private getParticipants(id: number): void {
    this.spinner.show();
    this.participantService.findByQuizId(id).subscribe( (result) => {
        if (result) {
          this.participants = result;
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          result.forEach((participant) => {
            this.getParticipantsAnswers(id, participant.id);
          })
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('An error occured when charging data');
      }
    )
  }

  private getParticipantsAnswers(quizId, participantId: number): void {
    this.spinner.show();
    this.participantAnswerService.get(quizId, participantId).subscribe( (results) => {
      if (results) {
        results.forEach((result) => {
          this.participantsAnswers.push(result);
        });
        this.buildDataSource();
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.toast.error('An error occured when charging data');
    });
  }

  private buildDataSource(): void {
    this.participants.forEach((participant) => {
      let test :any = [];
      this.questions.forEach((question) => {
        let pd: any = [];
        let reponse = this.participantsAnswers.find((answer) => answer.questionId === question.id && answer.participantId === participant.id);
        let correct = this.answers.find((answer) => answer.questionId === question.id && answer.correct);
        pd.question = question.title;
        pd.reponse = reponse.answerId ? this.answers.find((answer) => answer.id === reponse.answerId).title : null;
        pd.bonneReponse = correct.title;
        pd.correct = reponse.answerId ? this.answers.find((answer) => answer.id === reponse.answerId).correct : false;
        test.push(pd);
      });
      this.resultsStats[participant.id] = test;
      // this.dataSource[participant.id] = new MatTableDataSource(test);
      // this.dataSource[participant.id].paginator = this.paginator;
      // console.log(this.paginator);
      this.score[participant.id] = this.participantsAnswers.filter((answer) => answer.participantId === participant.id && answer.correct).length;
    });
  }

  private getQuestions(id: number): void {
    this.spinner.show();
    this.questionService.findByQuizId(id).subscribe( (result) => {
        if (result) {
          this.questions = result;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('An error occured when charging data');
      }
    )
  }

  private getAnswers(id: number): void {
    this.spinner.show();
    this.answerService.findByQuizId(id).subscribe( (result) => {
        if (result) {
          this.answers = result;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('An error occured when charging data');
      }
    )
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detailsResults(element: Participant): void {
    this.dialog.open(ResultModalComponent, {
      width: '100%',
      height: '90%',
      data: [element, this.resultsStats[element.id]]
    });
  }
}
