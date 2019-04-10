import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Process } from '../../models/Process';
import * as _ from 'lodash';

@Component({
  selector: 'app-processes-table',
  templateUrl: './processes-table.component.html',
  styleUrls: ['./processes-table.component.css']
})
export class ProcessesTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'priority', 'io', 'remainingIo', 'compute', 'remainingCompute', 'waitingTime', 'nbThreads', 'threadsStates'];
  dataSource: MatTableDataSource<Process>;
  @Input()
  processes: Process[];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.processes);
  }

  getMeanWaitingTime(): number {
    return _.round(_.sumBy(this.processes, 'waitingTime') / this.processes.length, 1);
  }

  getMeanWaitingTimeByThread(): number {
    return _.round(_.reduce(this.processes, (prev, process) => prev + (process.waitingTime / process.nbThreads), 0) / this.processes.length, 1);
  }
}
