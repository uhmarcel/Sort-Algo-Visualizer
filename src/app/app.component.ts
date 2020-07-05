import { Component } from '@angular/core';
import { BreakpointService } from './breakpoint.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sort Algo Visualizer';

  constructor(
    public readonly breakpointService: BreakpointService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'gh-icon', domSanitizer.bypassSecurityTrustResourceUrl("../assets/github-icon.svg")
    );
  }
}
