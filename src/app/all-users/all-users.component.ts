import {Component, OnInit} from '@angular/core';
import {User} from "../utils/Interfaces";
import {user} from "../utils/testData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
// todo receive data from server
  userList: User[] = user

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  redirectToUpdateView(id: number): void {
    this.router.navigate(['/user/update/' + id])
  }

}
