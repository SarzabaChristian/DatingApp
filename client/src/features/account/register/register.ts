import { Component, EventEmitter, inject, input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type RegisterCreds } from '../../../types/registercreds';
import { type User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected creds = {} as RegisterCreds;
  private accountService = inject(AccountService);
  // @Output() cancelRegister = new EventEmitter();
  cancelRegister = output<void>();

  register(){
    this.accountService.registerUser(this.creds).subscribe({
      next: (user) => {
        console.log(user);
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel(){
    this.cancelRegister.emit();
  }
}
