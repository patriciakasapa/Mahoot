import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Router } from "@angular/router";
import { GamerNameService } from "src/app/services/gamer-name/gamer-name.service";
import { GamerAnswer } from "src/app/classes/gamer-answer/gamer-answer";


@Component({
  selector: 'app-gamer-name',
  templateUrl: './gamer-gameplay.component.html',
  styleUrls: ['./gamer-gameplay.component.css']
})
export class GamerGameplayComponent implements OnInit {

  timer: number = 0;
  points: number = 0;
  reducer: number = 0;

  roomName: string = '';
  gamerName: string = '';
  gamePlayData: any[] = [];  
  gamerDetails: boolean = true;
  gamePlayContent: boolean = false;
  spinnerDisplay: boolean = false;

  // cards displayed when answer is choosen
  correctCard: boolean = false;
  wrongCard: boolean = false;
  timeoutCard: boolean = false;

  //gamer-answer
  gamerAnswer: GamerAnswer = new GamerAnswer();

  constructor(private websocketService: WebsocketService, private router: Router,
    private gamerNameService: GamerNameService) { }

  ngOnInit(): void {

    
    
    this.websocketService.getGameRoomData().subscribe((question: any) => {
      this.gamePlayData = question;
      
      if (this.gamePlayData.length > 0){
        
        this.spinnerDisplay = false;    
        this.gamePlayContent = true;

        this.gamePlayData.forEach((question: any) => {
            this.points = question.points;
            this.timer = question.timer;
        });

      this.reducer = (this.points/this.timer);
        setInterval(() => {
          if(this.timer > 0) {
            this.timer--;
            this.points = parseFloat(((this.points - this.reducer).toFixed(2)));
          } else {
            this.timer;
            this.gamePlayData.length = 0;
          }
        },1000);
      } 
      else {
        this.correctCard = false;
        this.wrongCard = false;
        this.timeoutCard = false;
      }
      });
  }


  sendGamerName(){
    //joining game room and sending gamer name to game room
    this.gamerNameService.setGamerName(this.gamerName);
    this.websocketService.joinGameRoom(this.roomName);
    this.websocketService.sendDataToGameRoom(this.roomName, this.gamerName);
    this.gamerDetails = false;
    this.spinnerDisplay = true;
    this.gamerAnswer.gamer_name = this.gamerNameService.getGamerName();
  }

  playerAnswer: any = "";

  choosenAnswer(index: number){
    this.gamePlayData.forEach((question: any) => {
        this.playerAnswer = question.answer[index];
        console.log(this.playerAnswer.is_correct);
        if (this.playerAnswer.is_correct == true) {
          this.gamePlayContent = false;
          this.gamerAnswer.points = this.gamerAnswer.points + this.points;
          this.correctCard = true;
        } else if (this.playerAnswer.is_correct == false) {
          this.gamePlayContent = false;
          this.wrongCard = true;
        }
      });
  }


}
