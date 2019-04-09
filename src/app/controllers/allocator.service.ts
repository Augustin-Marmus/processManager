import { Injectable } from '@angular/core';
import { Allocator, FIFOAllocator, LRUAllocator } from './allocators/Allocator';
import { ProcessesService } from './processes.service';
import { PagesService } from './pages.service';

@Injectable({
  providedIn: 'root'
})
export class AllocatorService {
  ALLOCATORS: Allocator[] = [
    new FIFOAllocator,
    new LRUAllocator,
  ];
  allocator: Allocator;

  constructor(private processesService: ProcessesService, private pagesService: PagesService) {
    this.allocator = this.ALLOCATORS[0];
  }

  setAllocator(name: string) {
    this.allocator = this.ALLOCATORS.find((allocator) => allocator.name === name);
  }

  onTimeUnitStart(tickNumber: number) {
    this.allocator.onTimeUnitStart(this.processesService.getProcesses(), this.pagesService.pages, tickNumber);
  }

  onTimeUnitEnd(tickNumber: number) {
    this.allocator.onTimeUnitEnd(this.processesService.getProcesses(), this.pagesService.pages, tickNumber);
  }

  get nbPages(): number { return this.pagesService.nbPages; };
  set nbPages(nb: number) { this.pagesService.nbPages = nb; };
}
