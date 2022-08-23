import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../utils/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  baseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {
  }


  public errorHandler = (err: HttpErrorResponse) => throwError(() => new Error(err.message))


  public getWorkers = (): Observable<User[]> => {
    return this.http.get<User[]>(this.baseUrl).pipe(catchError(this.errorHandler))
  }
  public getWorkersDetails = (id: any): Observable<User> => {
    return this.http.get<User>(`${this.baseUrl}/${id}`)

  }

}
