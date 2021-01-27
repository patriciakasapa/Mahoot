import { Component, OnInit } from '@angular/core';
import { ScoreboardComponent } from "src/app/scoreboard/scoreboard.component";

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {

  podiumData: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
