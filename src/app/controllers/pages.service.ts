import { Injectable } from '@angular/core';
import Page from '../models/Page';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  pages: Page[] = new Array<Page>();

  constructor() {
    _.times(10, () => this.pages.push(new Page(null)));
  }

  get nbPages() { return this.pages.length; };
  set nbPages(nb: number) {
    if (nb < 1) {
      throw new Error('Pages : Number of pages must be positive');
    }
    while (nb !== this.nbPages) {
      if (this.nbPages > nb) {
        this.pages.pop();
      } else {
        this.pages.push(new Page(null));
      }
    }
  }

  reset(): void {
    _.forEach(this.pages, (_, index) => {
      this.pages[index] = new Page(null);
    });
  }
}
