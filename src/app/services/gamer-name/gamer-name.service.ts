import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamerNameService {

  gamers: any[] = [];
  gamerName: string = ''

  constructor() { }

  setGamerName(gamerName: string){
    this.gamers.push();
    this.gamerName = this.gamers[0];
    this.gamers.slice();
  }

  getGamerName(){
    return this.gamerName;
  }
}
