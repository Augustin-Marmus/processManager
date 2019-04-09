import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessesService } from '../controllers/processes.service';
import { Process } from '../models/Process';
import { Router } from '@angular/router';
import { ManagerService } from '../controllers/manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  processes: Process[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private processesService: ProcessesService,
    private managerService: ManagerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProcesses();
  }

  getProcesses(): void {
    this.processes = this.processesService.getProcesses();
  }

  createNewProcess(): void {
    const id = this.processesService.create({ name: 'New Process' });
    this.router.navigate(['process', id]);
  }

  deleteProcess(id: number): void {
    this.processesService.delete(id)
    if (this.router.url === `/process/${id}`)
      this.router.navigate(['tree']);
  }

  start() {
    this.managerService.start();
  }

  pause() {
    this.managerService.pause();
  }

  step() {
    this.managerService.step();
  }

  reset() {
    this.managerService.reset();
  }
}
