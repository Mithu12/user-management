import {Validators} from "@angular/forms";

export interface User {
  image: string,
  name: string,
  email: string,
  phone: string,
  nid?: number,
  address: {
    area: string,
    district: string,
    postalCode: number,
  }
}
