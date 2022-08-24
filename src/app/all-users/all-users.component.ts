import {Component, OnInit} from '@angular/core';
import {User} from "../utils/Interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserManageService} from "../services/user-manage.service";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  loading = true

  // pagination data
  totalPage = 1
  currentPage = 1
  pageList: number[] = []


  constructor(private userService: UserManageService, private router: Router, public snackBar: MatSnackBar, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((p) => {
      this.currentPage = Number(p['currentPage']) || 1
    })
    this.getAllUsers(this.currentPage)
  }

  // Pagination functionality
  pageChange = (page: number) => {
    if (page < 1 || page > this.totalPage)
      return
    this.currentPage = page
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {currentPage: page}
      });
    this.getAllUsers(this.currentPage)
  }


  // show snackBar message on error or success
  snackBarMessage = (message: string) => {
    this.snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

// fetch all the user list from server
  getAllUsers = (currentPage: number) => {
    this.loading = true
    this.userService.getWorkers(currentPage).subscribe({
      next: (data) => {
        this.userList = data.data
        this.totalPage = data.totalPages
        let a = []
        for (let i = 1; i <= data.totalPages; i++)
          a.push(i)
        this.pageList = a
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
        this.getAllUsers(this.currentPage)
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
