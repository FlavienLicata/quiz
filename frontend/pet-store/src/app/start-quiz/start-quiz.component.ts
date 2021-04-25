import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { QuizService } from "../services/quiz.service";
import { Participant } from "../models/participant";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ParticipantService } from "../services/participant.service";
import { QuestionService } from "../services/question.service";
import { AnswerService } from "../services/answer.service";
import { Question } from "../models/question";
import { Answer } from "../models/answer";
import { ParticipantAnswer } from "../models/participantAnswer";
import { ParticipantAnswerService } from "../services/participantAnswer.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private quizService: QuizService, private participantService: ParticipantService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private participantAnswerService: ParticipantAnswerService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog, private route: ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef, private spinner: NgxSpinnerService, private toast: ToastrService) { }

  participant: Participant;
  questions: Question[];
  answers: Answer[];
  participantAnswers: ParticipantAnswer[] = [];
  quizId: number;
  formGroup: FormGroup = this.formBuilder.group({
    'name': [null, Validators.required]
  });
  cantParticipate: boolean = false;
  id: number = 0;
  timer: number = 0;
  totalTimer: number = 0;
  interval: number;
  currentAnswer: Answer;
  resultsView: boolean = false;
  displayedColumns: string[] = ['question', 'reponse', 'resultat', 'correct'];
  score: number = 0;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    this.initGame(token);
  }

  private initGame(token: string): void {
    this.spinner.show();
    this.participantService.searchByToken(token).subscribe( (result) => {
        if (result) {
          this.participant = result;
          this.quizId = result.quizId;
          this.loadQuestions(this.quizId);
          this.loadAnswers(this.quizId);
          this.spinner.hide();
        } else {
          this.cantParticipate = true;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('An error occured when charging data');
      }
    )
  }

  private loadQuestions(quizId: number): void {
    this.spinner.show();
    this.questionService.findByQuizId(quizId).subscribe( (result) => {
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

  private loadAnswers(quizId: number): void {
    this.spinner.show();
    this.answerService.findByQuizId(quizId).subscribe( (result) => {
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

  onStartQuiz(form): void {
    this.participant.name = form.name;
    this.startTotalTime();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer++;
      if (this.timer === 15) {
        if (this.id + 1 !== this.questions.length) {
          this.nextQuestion();
        } else {
          this.submitQuiz();
        }
      }
    },1000)
  }

  startTotalTime() {
    setInterval(() => {
      this.totalTimer++;
    },1000)
  }

  getQuestion(): Question {
    return this.questions[this.id];
  }

  onSelectedAnswer(answer: Answer): void {
    this.currentAnswer = answer;
  }

  nextQuestion(): void {
    this.saveResult(this.currentAnswer);
    this.id++;
    this.currentAnswer = null;
    clearInterval(this.interval);
    this.timer = 0;
    this.startTimer();
  }

  saveResult(answer: Answer): void {
    const question = this.questions[this.id];
    let participantAnswer = new ParticipantAnswer();
    participantAnswer.participantId = this.participant.id;
    participantAnswer.questionId = question.id;
    participantAnswer.quizId = this.quizId;
    participantAnswer.answerId = answer ? answer.id : null;
    participantAnswer.correct = answer ? answer.correct : false;
    this.participantAnswers.push(participantAnswer);
  }

  submitQuiz(): void {
    clearInterval(this.interval);
    this.saveResult(this.currentAnswer);
    this.participant.timer = this.totalTimer;
    this.participant.completionRate = this.getCompletionRate(this.participantAnswers);
    this.participant.successRate = this.getSuccessRate(this.participantAnswers);
    this.saveAllAnswers();
    this.saveParticipation();
    this.buildDataSource();
  }

  private getCompletionRate(participantAnswers: ParticipantAnswer[]): number {
    let nbAnswer = 0;
    participantAnswers.forEach((answer) => {
      if (answer.answerId) {nbAnswer++;}
    });
    return (nbAnswer / participantAnswers.length) * 100;
  }

  private getSuccessRate(participantAnswers: ParticipantAnswer[]): number {
    let nbAnswer = 0;
    participantAnswers.forEach((answer) => {
      if (answer.correct) {nbAnswer++;}
    });
    return (nbAnswer / participantAnswers.length) * 100;
  }

  private saveAllAnswers(): void {
    this.spinner.show();
    this.participantAnswers.forEach((participantAnswer) => {
      this.participantAnswerService.save(participantAnswer).subscribe( result => {
          if (result) {
            this.spinner.hide();
          }
        },
        error => {
          this.spinner.hide();
          this.toast.error('Une erreur est survenue');
        }
      );
    })
  }

  private saveParticipation(): void {
    this.spinner.show();
    this.participantService.saveParticipation(this.quizId, this.participant).subscribe( result => {
        if (result) {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('Une erreur est survenue');
      }
    );
  }

  private buildDataSource(): void {
    let test :any = [];
    this.questions.forEach((question) => {
      let pd: any = [];
      let reponse = this.participantAnswers.find((answer) => answer.questionId === question.id);
      let correct = this.answers.find((answer) => answer.questionId === question.id && answer.correct);
      pd.question = question.title;
      pd.reponse = reponse.answerId ? this.answers.find((answer) => answer.id === reponse.answerId).title : null;
      pd.bonneReponse = correct.title;
      pd.correct = reponse.answerId ? this.answers.find((answer) => answer.id === reponse.answerId).correct : false;
      test.push(pd);
    });
    this.dataSource = new MatTableDataSource(test);
    this.dataSource.paginator = this.paginator;
    this.score = this.participantAnswers.filter((answer) => answer.correct).length;
    this.resultsView = true;
  }
}
