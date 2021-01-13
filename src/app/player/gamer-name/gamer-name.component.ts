import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Router } from "@angular/router";
import { GamerNameService } from "src/app/services/gamer-name/gamer-name.service";


@Component({
  selector: 'app-gamer-name',
  templateUrl: './gamer-name.component.html',
  styleUrls: ['./gamer-name.component.css']
})
export class GamerNameComponent implements OnInit {

  timer: number = 0;
  points: number = 0;
  reducer: number = 0;

  roomName: string = '';
  gamerName: string = '';
  gamePlayData: any[] = [];  
  gamerDetails: boolean = true;
  gamePlayContent: boolean = false;
  spinnerDisplay: boolean = false;

  constructor(private websocketService: WebsocketService, private router: Router,
    private gamerNameService: GamerNameService) { }

  ngOnInit(): void {

    
    this.websocketService.getGameRoomData().subscribe((question: any) => {
      this.gamePlayData = question;
      
      if (this.gamePlayData.length > 0){
        // this.gamerNameService.getGamerName();
        
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
          }
        },1000);
      }
      });
  }


  sendGamerName(){
    // this.websocketService.sendGamerName(this.gameRoom.data);
    this.gamerNameService.setGamerName(this.gamerName);
    this.websocketService.joinGameRoom(this.roomName);
    this.websocketService.sendDataToGameRoom(this.roomName, this.gamerName);
    this.gamerDetails = false;
    this.spinnerDisplay = true;
    // this.router.navigate(['/gamer-gameplay']);
  }

  userAnswer: string = '';

  choosenAnswer(index: number){
    this.gamePlayData.forEach((quiz: any) => {
      quiz.questions.forEach((question: any) => {
        this.userAnswer = question.answer[index].answer_body
        console.log(this.userAnswer);
        });
      });
  }


}
