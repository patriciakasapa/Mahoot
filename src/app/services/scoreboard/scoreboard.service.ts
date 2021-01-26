import { Injectable } from '@angular/core';
import { GamerDetails } from 'src/app/classes/gamer-answer/gamer-details';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  gamersDetails: GamerDetails = new GamerDetails();

  constructor() { }

  setGamerAnswer(gamerDetails: GamerDetails){
    this.gamersDetails = gamerDetails ;
  }

  getGamerAnswer(){
    return this.gamersDetails;
  }

}
