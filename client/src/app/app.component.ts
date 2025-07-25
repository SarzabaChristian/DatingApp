import { type User } from './../types/user';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private accountService = inject(AccountService);
  protected title = 'Dating App';
  protected members = signal<User[]>([]);

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString){
      return;
    }

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  ngOnInit(): void {
    this.setCurrentUser();
    const subscriber = this.httpClient.get<User[]>("https://localhost:5001/api/Members").subscribe({
      next: (response) => {
        this.members.set(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Completed the http request');
      }
    });

    this.destroyRef.onDestroy(()=>{
      subscriber.unsubscribe();
    });
  }
}
