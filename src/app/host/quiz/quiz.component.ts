import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Host } from 'src/app/classes/host/host';
import { Quiz } from 'src/app/classes/quiz/quiz';
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HostDataService } from "src/app/services/host-data/host-data.service";



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  //define API
  apiURL = 'https://tahoot-backend.herokuapp.com';

  host: Host = new Host();
  quiz: Quiz = new Quiz();

  constructor(private http: HttpClient, 
    private hostNameService: HostNameService,
    private hostDataService: HostDataService)
    {
    
   }

  ngOnInit(): void {
    this.host.host_name = this.hostNameService.getHostName();
  }

  createQuiz(){
    
    //getting host name
    this.host.host_name = this.hostNameService.getHostName();
    this.host.quiz.push(this.quiz);

    this.http.post(this.apiURL + "/createhost", this.host)
    .pipe(catchError(this.handleError))
    .subscribe(
      data => {
        console.log(data);
      });

    this.http.get(this.apiURL + "/gethost")
    .pipe(catchError(this.handleError))
    .subscribe((data: any) => {
      this.hostDataService.setHostData(data);
    })
  }

  //handling errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message)
    } else {
      console.error(error.status)
    }

    return throwError("Error!");
  }

}
