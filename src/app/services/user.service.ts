import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "https://sheet.best/api/sheets/d7d6b31f-1a63-4f15-8252-8e07743e8ff6";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'X-Api-Key': 'K9nAnRby98$b5wrG7-CKmX1Ezi5XD3C575nqnh$jA%#e0LP8sRi0gZvCqMlm$PXo'
    })
  }

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  delete(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  }

  update(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user);
  }
}
