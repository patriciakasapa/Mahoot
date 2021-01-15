import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { QuestionsService } from "src/app/services/questions/questions.service";
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamePlayDataService } from "src/app/services/game-play-data/game-play-data.service";
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { Host } from 'src/app/classes/host/host';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css'],
})
export class HostDashboardComponent implements OnInit {

  //define API
  apiURL = 'https://tahoot-backend.herokuapp.com';
  
  currentQuiz: any[] = [];

  host: Host = new Host();
  
  quiz_number: number = 0;
  host_data: any;

  constructor(private router: Router, public dialog: MatDialog, 
    private questionsService: QuestionsService, private http: HttpClient,
    private websocketService: WebsocketService, private gamePlayDataSerivce: GamePlayDataService,
    private hostNameService: HostNameService, private authService: AuthService
    ) 
    {
      this.http.get(this.apiURL + "/gethost").subscribe((data: any) => {
        this.host_data = data;
        this.quiz_number = this.host_data.length;
    });
    }

  ngOnInit(): void {
    this.authService.isNotLogin();
    this.host.host_name = this.hostNameService.getHostName();
  }

  //side menu trigger
  slideCheck: boolean = false;

  slideTrigger(){
    if (this.slideCheck == false) {
        this.slideCheck = true;
      } else {
        this.slideCheck = false;
      }
    }

  signOut(): void {
    this.authService.logout();
    }

    //hiding and showing question contents
    questioncontentshow: boolean = false;
    questioncontenthide: boolean = true;
    quiz_cards: boolean = false;

  questionContentShow(){
    this.questioncontentshow = true;
    this.questioncontenthide = false;
    this.quiz_cards = false;
    }

  questionContentHide(){
      this.questioncontentshow = false;
      this.questioncontenthide = true;
      this.quiz_cards = false;
  }

  showQuizCards(){
    this.quiz_cards = true;
    this.questioncontentshow = false;
    this.questioncontenthide = true;
  }

  addQuestion(){
    
  }

  //begin the quiz
  startQuiz(index: number){
    this.gamePlayDataSerivce.setGamePlayData(this.host_data[index]);

    this.currentQuiz.push(this.host_data[index]);
    this.currentQuiz.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.websocketService.joinGameRoom(quiz.game_pin);
      });
    });
    this.router.navigate(['/game']);
  }

  

  


}
