import {Component, OnInit} from '@angular/core';
import {UserManageService} from "../services/user-manage.service";
import {User, UserDetails} from "../utils/Interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: UserDetails = {
    image: '',
    name: "",
    email: '',
    nid: 0,
    id: 0,
    phone: '',
    area: '',
    postalcode: 0,
    district: ''
  }
  id: number = 0

  loading = true

  server = environment.serverUrl

  constructor(private userService: UserManageService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
  }

  // show snackBar message on error or success
  snackBarMessage = (message: string) => {
    this.snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: ParamMap) => this.id = Number(p.get('id')))
    this.userService.getWorkersDetails(this.id).subscribe({
      next: (data) => {
        this.user = data.data
        this.loading = false
      },
      error: (error) => {
        this.snackBarMessage(error.message)
        this.loading = false
      }
    })
  }

}
