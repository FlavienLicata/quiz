import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Participant } from "../models/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

   findById(id: number): Observable<Participant>{
      return this.http.get<Participant>('http://localhost:9000/participant/'+id);
   }

  findByQuizId(id: number): Observable<Participant[]>{
    return this.http.get<Participant[]>('http://localhost:9000/participant/quiz/'+id);
  }

  save(id: number, participant: Participant): Observable<Participant> {
    return this.http.post<Participant>('http://localhost:9000/participant/quiz/'+id, participant);
  }

  saveParticipation(id: number, participant: Participant): Observable<Participant> {
    return this.http.post<Participant>('http://localhost:9000/participant/quiz/'+id +'/save-participation', participant);
  }

  resendInvitation(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>('http://localhost:9000/participant/quiz/'+participant.quizId +'/resend-invitation', participant);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>('http://localhost:9000/participant/'+id)
  }

  findPendingParticipantsByQuizId(id: number): Observable<Participant[]>{
    return this.http.get<Participant[]>('http://localhost:9000/participant/quiz/'+id + '/pending-participants');
  }

  searchByToken(token: string): Observable<Participant>{
    return this.http.get<Participant>('http://localhost:9000/participant/token/' + token);
  }

  countParticipationByParticipationDate(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:9000/participant/quiz/' + id + '/response/history');
  }

  getAverageTime(id: number): Observable<number>{
    return this.http.get<number>('http://localhost:9000/participant/quiz/'+id + '/average/time');
  }

  getAverageCompletion(id: number): Observable<number>{
    return this.http.get<number>('http://localhost:9000/participant/quiz/'+id + '/average/completion');
  }

  getAverageSuccess(id: number): Observable<number>{
    return this.http.get<number>('http://localhost:9000/participant/quiz/'+id + '/average/success');
  }

}
