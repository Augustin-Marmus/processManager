import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Process } from '../../models/Process';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'priority', 'io', 'remainingIo', 'compute', 'remainingCompute', 'nbThreads', 'threadsStates'];
  dataSource: MatTableDataSource<Process>;
  @Input()
  processes: Process[];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.processes);
  }


}
