import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';


export interface PeriodicElement {
  gamer_name: string;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { gamer_name: 'Kelvin', points: 10},
  { gamer_name: 'Ama', points: 50},
  { gamer_name: 'Edinam', points: 20},
  { gamer_name: 'Merari', points: 40},
  { gamer_name: 'Pat', points: 80},
  { gamer_name: 'Sam', points: 12},
  { gamer_name: 'David', points: 60},
  { gamer_name: 'prince', points: 100},
  { gamer_name: 'Nana', points: 2}
];


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements AfterViewInit {

  constructor(private cdref: ChangeDetectorRef) { }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'points', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.cdref.detectChanges();

  }

  displayedColumns: string[] = ['gamer_name', 'points'];
  dataSource = new MatTableDataSource(ELEMENT_DATA.slice(0, 5));

  @ViewChild(MatSort) sort: MatSort = new MatSort;


}
