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

    // redirect if user already logged in
    if (document.cookie.includes('loggedIn'))
      router.navigate(['/user/list'])
  }

  // login form group
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  login = async () => {

    // set cookie and emit newLogin event for app.component to listen
    document.cookie = `loggedIn=${this.getFormFieldData('email')?.value};`;
    this.newLogin.emit()
    await this.router.navigate(['/user/list'])
  }

  // return form group data by name
  getFormFieldData = (name: string) => {
    return this.loginForm.get(name)
  }

  // return validation status of form group by name
  getValidationStatus = (name: string) => {
    return !(this.getFormFieldData(name)?.valid && this.getFormFieldData(name)?.untouched)
  }

}
