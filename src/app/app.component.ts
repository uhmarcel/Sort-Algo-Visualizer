import { Component } from '@angular/core';
import { BreakpointService } from './breakpoint.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BASE_HREF } from './constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from './config.service';
import { PlaybackService } from './playback.service';
import { filter, withLatestFrom, map, skipUntil, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sort Algo Visualizer';

  constructor(
    public readonly breakpointService: BreakpointService,
    private readonly configService: ConfigService,
    private readonly playbackService: PlaybackService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly snackBar: MatSnackBar,
  ) {
    this.matIconRegistry.addSvgIcon(
      'gh-icon', domSanitizer.bypassSecurityTrustResourceUrl(BASE_HREF + "assets/github-icon.svg")
    );
    
    this.playbackService.isPlaying$.pipe(
      filter(isPlaying => (isPlaying === true)),
      withLatestFrom(this.configService.sortingAlgorithm$),
      map(([_, algorithm]) => algorithm.name),
      distinctUntilChanged()
    )
    .subscribe(runningAlgorithm => {
      this.notifyAlgorithmRunning(runningAlgorithm);
    });
  }

  notifyAlgorithmRunning(algorithmName: string) {
    this.snackBar.open(`Running ${algorithmName} ...`, '', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
