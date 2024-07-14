import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://vdpb-ackend-4ntva1u81-davides-projects-56acf969.vercel.app/api/users'; // Sostituisci con l'URL effettivo della tua API

  constructor(private http: HttpClient) { }

  //list User

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}