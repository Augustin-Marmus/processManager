import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Process } from '../../models/Process';

@Component({
  selector: 'app-processes-table',
  templateUrl: './processes-table.component.html',
  styleUrls: ['./processes-table.component.css']
})
export class ProcessesTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'priority', 'io', 'remainingIo', 'compute', 'remainingCompute', 'nbThreads', 'threadsStates'];
  dataSource: MatTableDataSource<Process>;
  @Input()
  processes: Process[];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.processes);
  }

}
