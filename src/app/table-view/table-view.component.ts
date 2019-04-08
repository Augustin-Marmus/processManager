import { Component, OnInit } from '@angular/core';
import { Process } from '../models/Process';
import { ProcessesService } from '../controllers/processes.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  processes: Process[];

  constructor(private processesService: ProcessesService) { }

  ngOnInit(): void {
    this.getProcesses();
  }

  getProcesses(): void {
    this.processes = this.processesService.getProcesses();
  }

}
