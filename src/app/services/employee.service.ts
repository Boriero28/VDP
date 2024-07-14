import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://vdpb-ackend-4ntva1u81-davides-projects-56acf969.vercel.app/api/employee'; 

  constructor(private http: HttpClient) { }

  loadEmployees(): Observable<any[]> {
    const url = `${this.apiUrl}/load`;
    return this.http.get<any[]>(url);
  }

}
