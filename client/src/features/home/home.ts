import { Component, Input, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { type User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected registerMode = signal(false);

  showRegister(val: boolean) {
    this.registerMode.set(val);
  }
}
