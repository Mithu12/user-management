import {Component, OnInit} from '@angular/core';
import {User} from "../utils/Interfaces";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserManageService} from "../services/user-manage.service";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
// todo receive data from server
  userList: User[] = []
  error = ''
  serverUrl = environment.serverUrl
  totalPage = 1
  lastId = 0

  length = 100;
  pageSize = 10;

  loading = true

  // MatPaginator Output
  // @ts-ignore
  pageEvent: PageEvent;


  constructor(private userService: UserManageService, private router: Router, public snackBar: MatSnackBar, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((p) => this.lastId = Number(p['lastId']))
    // console.log(this.lastId)
    this.getAllUsers(this.lastId)
  }

  // show snackBar message on error or success
  snackBarMessage = (message: string) => {
    this.snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

// fetch all the user list from server
  getAllUsers = (lastId: number) => {
    this.loading = true
    this.userService.getWorkers(lastId).subscribe({
      next: (data) => {
        this.userList = data.data
        this.totalPage = data.totalPages
        this.loading = false
      },
      error: (error) => {
        this.snackBarMessage(error.message)
        this.loading = false
      }
    })
  }

  // remove a user by id from DB
  removeUser = (id: number | undefined) => {
    this.loading = true
    this.userService.deleteWorker(id).subscribe({
      next: (data) => {
        this.getAllUsers(this.lastId)
        this.snackBarMessage(data.message)
        this.loading = false
      },
      error: (error) => {
        this.snackBarMessage(error.message)
        this.loading = false
      }
    })
  }

  redirectToUpdateView(id: number): void {
    this.router.navigate(['/user/update/' + id])
  }


  redirectToDetailsView(id: number): void {
    this.router.navigate(['/user/details/' + id])
  }

}
