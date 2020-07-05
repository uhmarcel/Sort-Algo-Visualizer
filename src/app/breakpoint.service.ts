import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { MOBILE_VIEW_BREAKPOINT } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  public readonly isMobileView$: Observable<boolean>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver
  ) { 
    this.isMobileView$ = this.breakpointObserver
      .observe([`(min-width: ${MOBILE_VIEW_BREAKPOINT}px)`])
      .pipe(
        map((state: BreakpointState) => !state.matches),
        distinctUntilChanged(),
        shareReplay(1)
      );
  }
}
