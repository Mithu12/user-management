import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
  }

  title = 'Employee Management';
  isLogged = document.cookie.includes('loggedIn')

  // when the user logs in
  newLogIn = () => {
    this.isLogged = true
  }

  // remove cookie to Log out the user
  logout = () => {
    document.cookie = 'loggedIn=; Max-Age=0'
    this.isLogged = false
    this.router.navigate(['login'])
  }
}
