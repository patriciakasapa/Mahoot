import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GamerDetails } from 'src/app/classes/gamer-answer/gamer-details';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit , AfterViewInit {

  constructor(private cdref: ChangeDetectorRef,
              private websocketService: WebsocketService) { }

  gamersDetails: GamerDetails[] = [];

  displayedColumns: string[] = ['gamer_name', 'points'];
  dataSource = new MatTableDataSource(this.gamersDetails);

  @ViewChild(MatSort) sort: MatSort = new MatSort;


  ngOnInit(): void {
    this.websocketService.getScoresForScoreboard().subscribe((score: any) => {
      console.log(score);
      this.gamersDetails.push(score);
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'points', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.cdref.detectChanges();
  }


}
