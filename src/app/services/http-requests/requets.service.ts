import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequetsService {

  apiURL = 'https://tahoot-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  // postRequest(data: any): Observable<any>{
  //   // return this.http.post<any>(this.apiURL, )
  // }
}
