import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
  }

  subscription: Subscription | undefined

  title = 'Employee Management';
  isLogged = document.cookie.includes('loggedIn')

  // when the user logs in
  newLogIn = (componentRef: any) => {
    if (!(componentRef instanceof LoginComponent))
      return;
    // change login status when newLogin event emits
    componentRef.newLogin.subscribe(() => {
      this.isLogged = true
    })
  }

  unsubscribe = () => {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

  logout = () => {
    // remove cookie, update isLogged to Log out the user
    document.cookie = 'loggedIn=; Max-Age=0'
    this.isLogged = false
    this.router.navigate(['login'])
  }
}
