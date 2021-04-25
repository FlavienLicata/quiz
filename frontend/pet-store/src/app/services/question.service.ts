import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Question>{
    return this.http.get<Question>('http://localhost:9000/question/'+id);
  }

  findByQuizId(id: number): Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:9000/question/quiz/'+id);
  }

  countQuestionByQuizId(id: number): Observable<number>{
    return this.http.get<number>('http://localhost:9000/question/count/quiz/'+id);
  }

}
