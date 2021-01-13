import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';


@Component({
  selector: 'app-gamer-gameplay',
  templateUrl: './gamer-gameplay.component.html',
  styleUrls: ['./gamer-gameplay.component.css']
})
export class GamerGameplayComponent implements OnInit {

  gamers: string[] = [];

  gamerName: string = '';
  
  gamerChoice: string = '';

  gamePlayData: any[] = [];

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {

    // this.websocketService.getGamerName().subscribe((data: string) => {
    //   this.gamers.push(data);
    //   this.gamerName = this.gamers[0];
    //   this.gamers.slice();
    // });

    // this.websocketService.joinGameRoom('30485');
    // setInterval(() => {
    //   if (this.gamePlayData.length < 0) {
    //     this.websocketService.getGameRoomData().subscribe((quiz: any) => {
    //       this.gamePlayData.push(quiz);
    //       console.log(this.gamePlayData);
    //     });
    //   } else {
    //     this.gamePlayData;
    //     console.log(this.gamePlayData);
    //   }
    // },10000);


    // this.websocketService.getGameRoomData().subscribe((quiz: any) => {
    //   this.gamePlayData.push(quiz);
    // });
    
  }

  sendGameChoice(){
      this.gamerName
  }

  //hiding gameplay display
  spinnerDisplay: boolean = true;
  gameplayDisplay: boolean = false;
  leaderBoardDisplay: boolean = false;

  gameplayContentShow(){
    if (this.spinnerDisplay == true){
      this.spinnerDisplay = false;
      this.gameplayDisplay = true;
      this.leaderBoardDisplay = false;
    } else if (this.gameplayDisplay == true){
      this.spinnerDisplay = false;
      this.gameplayDisplay = false;
      this.leaderBoardDisplay = true;
    } else if (this.leaderBoardDisplay == true){
      this.spinnerDisplay = true;
      this.gameplayDisplay = false;
      this.leaderBoardDisplay = false;
    }
  }

  display(){
    //this.websocketService.joinGameRoom('115584565');
    
  }

}
