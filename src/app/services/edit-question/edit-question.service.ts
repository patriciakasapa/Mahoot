import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable'


@Injectable({
  providedIn: 'root'
})
export class EditQuestionService {
  addEditQuestion(question: any){
    throw new Error('Method not implimented');
  }

  question: any;
  private endpoint = "http://tahoot-backend.herokuapp.com/question/"; //URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http : HttpClient) { }

  setQuestion(question: any){   
    this.question = question;
  }
  getQuestion(){
    this.question = this.question;
  }
  updateQuestion(question: any): Observable<any>{
    return this.http.put(this.endpoint, question.question_id, this.httpOptions) .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error : HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error(error.error.message)
    }else{
      console.error(error.status)
    }
     return throwError("Error")
  }
}
