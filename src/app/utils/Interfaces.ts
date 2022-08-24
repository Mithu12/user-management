export interface User {
  id?: number,
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

export interface UserDetails {
  id?: number,
  image: string,
  name: string,
  email: string,
  phone: string,
  nid?: number,
  area: string,
  district: string,
  postalcode: number,

}
