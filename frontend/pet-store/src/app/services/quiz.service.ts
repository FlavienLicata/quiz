import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Quiz } from "../models/quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

   findById(id: number): Observable<Quiz>{
      return this.http.get<Quiz>('http://localhost:9000/quiz/'+id);
   }

  findByOwner(id: number): Observable<Quiz[]>{
    return this.http.get<Quiz[]>('http://localhost:9000/quiz/owner/'+id);
  }
}
