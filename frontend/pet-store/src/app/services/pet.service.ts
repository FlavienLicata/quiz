import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pet } from "src/app/models/pet";
import { SearchForm } from "src/app/models/searchForm";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

   findAll(): Observable<Pet[]>{
      return this.http.get<Pet[]>('http://localhost:9000/pets');
   }

   save(pet: Pet): Observable<Pet>{
      return this.http.post<Pet>('http://localhost:9000/pets', pet);
   }

   delete(id: number): Observable<number>{
      return this.http.delete<number>('http://localhost:9000/pets/'+id);
   }

   findById(id: number): Observable<Pet>{
      return this.http.get<Pet>('http://localhost:9000/pets/'+id);
   }

   findWithForm(search: SearchForm): Observable<Pet[]>{
      return this.http.post<Pet[]>('http://localhost:9000/pets/search', search);
   }

}
