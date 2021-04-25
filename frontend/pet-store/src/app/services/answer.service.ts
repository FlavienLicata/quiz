import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Answer } from "../models/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

   findById(id: number): Observable<Answer>{
      return this.http.get<Answer>('http://localhost:9000/answer/'+id);
   }

  findByQuizId(id: number): Observable<Answer[]>{
    return this.http.get<Answer[]>('http://localhost:9000/answer/quiz/'+id);
  }

  // countQuestionByQuizId(id: number): Observable<number>{
  //   return this.http.get<number>('http://localhost:9000/question/count/quiz/'+id);
  // }

}
