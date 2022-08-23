import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public newLogin = new EventEmitter()

  constructor(private fb: FormBuilder, private router: Router) {
    if (document.cookie.includes('loggedIn'))
      router.navigate(['/users'])
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  login = async () => {
    document.cookie = `loggedIn=${this.getFormFieldData('email')?.value};`;
    this.newLogin.emit('login')
    await this.router.navigate(['/users'])
  }
  getFormFieldData = (name: string) => {
    return this.loginForm.get(name)
  }

}
