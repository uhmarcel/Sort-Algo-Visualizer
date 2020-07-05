import { Component } from '@angular/core';
import { BreakpointService } from './breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sort Algo Visualizer';

  constructor(
    public readonly breakpointService: BreakpointService
  ) {}
}
