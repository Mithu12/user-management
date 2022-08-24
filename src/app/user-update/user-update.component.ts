import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {districtList} from "../utils/districtList";
import {UserManageService} from "../services/user-manage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  id: number = 0
  districts = districtList
  imageUrl = ''
  image: any
  loading = true
  server = environment.serverUrl

  constructor(private userService: UserManageService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
  }


  // Update form group
  updateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    nid: [0, [Validators.pattern(/^[0-9]*$/),]],
    address: this.fb.group({
      area: ['', Validators.required],
      district: ['', Validators.required],
      postalCode: [0, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })
  })


  // show snackBar message on error or success
  snackBarMessage = (message: string) => {
    this.snackBar.open(message, 'X', {
      duration: 2000,
    });
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((p: ParamMap) => this.id = Number(p.get('id')))
    this.fetchWorkerDetails()
  }

  fetchWorkerDetails = () => {

    this.userService.getWorkersDetails(this.id).subscribe({
      next: (data) => {
        const {
          email,
          phone,
          name,
          nid,
          area,
          postalcode,
          district,
          image,
        } = data.data
        this.imageUrl = this.server + image
        this.updateForm.patchValue({
          address: {area, district, postalCode: postalcode},
          email: email,
          phone: phone,
          name: name,
          nid: nid
        })
        this.loading = false
      },
      error: (error) => this.snackBarMessage(error.message)
    })
  }


  formData = new FormData();
  updateUser = async () => {
    this.loading = true
    // building Form data for sending to server
    const formGroupFields = ['name', 'email', 'phone', 'nid'],
      nestedFormFields = ['area', 'district', 'postalCode']
    formGroupFields.map(n => this.setFormDataForServer(n))

    // transfer nested formGroup "address" data to formData
    nestedFormFields.map(n => this.setFormDataForServer('address.' + n, n))
    this.image && this.formData.set('image', this.image)
    this.formData.set('id', this.id.toString())

    // call to service for user information update
    this.userService.updateWorkersDetails(this.formData).subscribe({
      next: (data) => {
        this.snackBarMessage(data.message)
        this.fetchWorkerDetails()
      },
      error: (message) => {
        // show snackBar message on error
        this.snackBarMessage(message)
      }
    })

  }

  // transfer data to formData from registerForm group
  setFormDataForServer = (name: string, fieldName = '') => {
    this.formData.set(fieldName || name, this.getFormFieldData(name)?.value)
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

  // return form group data by name
  getFormFieldData = (name: string) => {
    return this.updateForm.get(name)
  }

  // return validation status of form group by name
  getValidationStatus = (name: string) => {
    return !(this.getFormFieldData(name)?.valid && this.getFormFieldData(name)?.untouched)
  }

  // return error of form group by error-type
  getErrorByType = (name: string, errorType: string) => {
    return this.updateForm.get(name)?.hasError(errorType)
  }

}
