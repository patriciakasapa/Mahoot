import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Kelvin', points: 10},
  { name: 'Ama', points: 50},
  { name: 'Edinam', points: 20},
  { name: 'Merari', points: 40},
  { name: 'Pat', points: 80},
  { name: 'Sam', points: 12},
  { name: 'David', points: 60},
  { name: 'prince', points: 100},
  { name: 'Nana', points: 2},
  { name: 'Hehe', points: 99}



];


@Component({
  selector: 'table-sorting-example',
  styleUrls: ['table-sorting-example.css'],
  templateUrl: 'table-sorting-example.html',
})
export class TableSortingExample implements AfterViewInit {
  constructor( private cdref: ChangeDetectorRef ) {}

  displayedColumns: string[] = ['name', 'points'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'points', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.cdref.detectChanges();

  }
}

