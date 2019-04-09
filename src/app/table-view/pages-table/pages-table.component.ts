import { Component, OnInit, Input } from '@angular/core';
import { Process } from 'src/app/models/Process';
import { AllocatorService } from 'src/app/controllers/allocator.service';
import * as _ from 'lodash';
import Page from 'src/app/models/Page';
import { PagesService } from 'src/app/controllers/pages.service';

@Component({
  selector: 'app-pages-table',
  templateUrl: './pages-table.component.html',
  styleUrls: ['./pages-table.component.css']
})
export class PagesTableComponent implements OnInit {
  @Input()
  processes: Process[];
  pages: Page[];

  constructor(private allocatorService: AllocatorService, private pagesService: PagesService) {

  }

  ngOnInit() {
    this.pages = this.pagesService.pages
  }
}
