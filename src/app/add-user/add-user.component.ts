import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {districtList} from "../utils/districtList";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  districts = districtList

  constructor(private fb: FormBuilder, private router: Router) {

    // redirect to login page if not logged in
    if (!document.cookie.includes('loggedIn'))
      router.navigate(['/'])

  }

  // login form group
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    nid: ['', [Validators.pattern(/^[0-9]*$/),]],
    address: this.fb.group({
      area: ['', Validators.required],
      district: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })
  })

  ngOnInit(): void {
  }


  addUser = async () => {

  }

  // return form group data by name
  getFormFieldData = (name: string) => {
    return this.registerForm.get(name)
  }

  // return validation status of form group by name
  getValidationStatus = (name: string) => {
    return !(this.getFormFieldData(name)?.valid && this.getFormFieldData(name)?.untouched)
  }

  // return error of form group by error-type
  getErrorByType = (name: string, errorType: string) => {
    return this.registerForm.get(name)?.hasError(errorType)
  }

}
