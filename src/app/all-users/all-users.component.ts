import {Component, OnInit} from '@angular/core';
import {User} from "../utils/Interfaces";
import {user} from "../utils/testData";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  userList: User[] = user

  constructor() {
  }

  ngOnInit(): void {
  }

}
