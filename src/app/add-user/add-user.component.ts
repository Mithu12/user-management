import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {districtList} from "../utils/districtList";
import {UserManageService} from "../services/user-manage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  districts = districtList
  imageUrl = '/assets/test.webp'
  image: any
  formData = new FormData()
  message = ''
  loading = false

  constructor(private fb: FormBuilder, private router: Router, private userService: UserManageService, public snackBar: MatSnackBar) {
    // redirect to login page if not logged in
    if (!document.cookie.includes('loggedIn'))
      router.navigate(['/'])

  }

  // register form group
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


// update the image when image is selected or changed
  imageChanged = async (e: any) => {
    let file: any;
    file = e.target.files[0];
    this.image = file

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(file)

  }

  // click image input trough button as input field is hidden
  selectImage = async (imageInput: HTMLInputElement) => {
    imageInput.click()
  }


  addUser = async () => {
    this.loading = true
    const formGroupFields = ['name', 'email', 'phone', 'nid'],
      nestedFormFields = ['area', 'district', 'postalCode']
    formGroupFields.map(n => this.setFormDataForServer(n))

    // transfer nested formGroup "address" data to formData
    nestedFormFields.map(n => this.setFormDataForServer('address.' + n, n))

    this.image && this.formData.set('image', this.image)
    this.userService.addWorkers(this.formData).subscribe({
      next: (data) => {
        this.loading = false
        this.router.navigate(['user/list'])
      },
      error: (message) => {
        // show snackBar message on error

        this.loading = false
        this.snackBar.open(message, 'X', {
          duration: 2000,
        });
      }
    })
  }

  // transfer data to formData from registerForm group
  setFormDataForServer = (name: string, fieldName = '') => {
    this.formData.set(fieldName || name, this.getFormFieldData(name)?.value)
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
