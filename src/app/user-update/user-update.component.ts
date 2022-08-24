import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {districtList} from "../utils/districtList";
import {user} from "../utils/testData";
import {User} from "../utils/Interfaces";

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: ParamMap) => this.id = Number(p.get('id')))
// todo get data from server
    let selectedUser: User = user.find(u => u.nid === this.id) || {
      image: '',
      address: {area: "", district: '', postalCode: 0}, email: '', phone: '',
      name: '',
      nid: 0

    }
    if (selectedUser)
      this.imageUrl = 'assets/' + selectedUser.image
    this.updateForm.patchValue({
      address: selectedUser.address || {area: "", district: '', postalCode: 0},
      email: selectedUser.email,
      phone: selectedUser.phone,
      name: selectedUser.name,
      nid: selectedUser.nid || 0

    })
  }


  formData = new FormData();
  addUser = async () => {
    // building Form data for sending to server
    const formGroupFields = ['name', 'email', 'phone', 'nid'],
      nestedFormFields = ['area', 'district', 'postalCode']
    formGroupFields.map(n => this.setFormDataForServer(n))

    // transfer nested formGroup "address" data to formData
    nestedFormFields.map(n => this.setFormDataForServer('address.' + n, n))
    this.image && this.formData.set('image', this.image)

    console.log(this.formData.get('name'))
    console.log(this.formData.get('email'))
    console.log(this.formData.get('phone'))
    console.log(this.formData.get('area'))
    console.log(this.formData.get('district'))
    console.log(this.formData.get('postalCode'))
    console.log(this.formData.get('image'))
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
