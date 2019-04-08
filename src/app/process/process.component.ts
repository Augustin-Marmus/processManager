import { Component, OnInit } from '@angular/core';
import { Process } from '../models/Process';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessesService } from '../controllers/processes.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  process: Process;
  constructor(
    private activatedRoute: ActivatedRoute,
    private processService: ProcessesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.process = this.processService.getProcess(+paramMap.get('id'));
      if (!this.process) {
        this.router.navigate(['/table']);
      }
    })
  }

}
