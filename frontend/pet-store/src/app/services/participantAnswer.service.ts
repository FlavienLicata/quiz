import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ParticipantAnswer } from "../models/participantAnswer";

@Injectable({
  providedIn: 'root'
})
export class ParticipantAnswerService {

  constructor(private http: HttpClient) { }

  save(participantAnswer: ParticipantAnswer): Observable<ParticipantAnswer> {
    return this.http.post<ParticipantAnswer>('http://localhost:9000/participant-answer/save', participantAnswer);
  }

  get(quizId, participantId: number): Observable<ParticipantAnswer[]> {
    return this.http.get<ParticipantAnswer[]>('http://localhost:9000/participant-answer/quiz/'+quizId+'/participant/'+participantId);
  }

}
