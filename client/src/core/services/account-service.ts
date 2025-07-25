import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { type User } from '../../types/user';
import { tap } from 'rxjs';
import { RegisterCreds } from '../../types/registercreds';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  registerCreds = signal<RegisterCreds | null>(null)

  baseUrl = 'https://localhost:5001/api/';

  login(creds: User) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');

  }

  registerUser(creds: RegisterCreds){
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}
