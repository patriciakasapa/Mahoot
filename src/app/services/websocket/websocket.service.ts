import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  private url = "https://tahoot-websocket.herokuapp.com";
  public socket;

  constructor() { 
    this.socket = io(this.url, 
      {transports: ['websocket'],
      upgrade: true,
      autoConnect: true
    });
    
   }

  // join game a room
  public joinGameRoom(roomName: string) {
    this.socket.emit('game-play-room', roomName);
  }

  public sendDataToGameRoom(roomName: string, data: any) {
    this.socket.emit('game-play-data', roomName, data);
  }

  public getGameRoomData(){
    let observable = new Observable((observer: any) => {
      this.socket.on('game-play-data', (gameRoomData: any) => {
              if (gameRoomData) {
                observer.next(gameRoomData);
                console.log(gameRoomData);
              } else {
                observer.console.error('Unable to reach server');
              }
            })
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  // public getGameRoomData = () => {
  //   return Observable.create((observer: any) => {
  //     this.socket.on('game-play-data', (gameRoomData: any) => {
  //       if (gameRoomData) {
  //         observer.next(gameRoomData);
  //         console.log(gameRoomData);
  //       } else {
  //         observer.console.error('Unable to reach server');
  //       }
  //     })
  //   })
  // }

}
