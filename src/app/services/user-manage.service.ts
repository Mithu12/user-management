import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User, UserDetails} from "../utils/Interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }


  public errorHandler = (err: HttpErrorResponse) => throwError(() => new Error(err.message))


  public getWorkers = (lastId: number): Observable<{ data: User[], totalPages: number }> => {
    console.log({lastId})
    return this.http.get<{ data: User[], totalPages: number }>(this.baseUrl + `/users${lastId ? `?lastId=${lastId}` : ''}`).pipe(catchError(this.errorHandler))
  }


  public addWorkers = (body: FormData): Observable<{ message: string }> => {
    return this.http.post<{ message: string }>(this.baseUrl + '/users', body).pipe(catchError(this.errorHandler))
  }


  public updateWorkersDetails = (body: FormData): Observable<{ message: string }> => {
    return this.http.patch<{ message: string }>(`${this.baseUrl}/users`, body)

  }


  public deleteWorker = (id: any): Observable<{ message: string }> => {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/users/${id}`)

  }


  public getWorkersDetails = (id: number): Observable<{ data: UserDetails }> => {
    return this.http.get<{ data: UserDetails }>(`${this.baseUrl}/users/${id}`)

  }

}
