import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostNameService {

  host_name = '';

  constructor() { }

  setHostName(host_name: string){
    this.host_name = host_name;
  }

  getHostName(){
    return this.host_name;
  }
}
