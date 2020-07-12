import { Component } from '@angular/core';
import { PlaybackService } from '../playback.service';
import { combineLatest } from 'rxjs';
import { ConfigService } from '../config.service';
import { BreakpointService } from '../breakpoint.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-graph-color',
  templateUrl: './graph-color.component.html',
  styleUrls: ['./graph-color.component.scss']
})
export class GraphColorComponent {

  public isCrowded = false;
  public isColorized = false;

  constructor(
    public readonly playbackService: PlaybackService,
    public readonly configService: ConfigService,
    public readonly breakpointService: BreakpointService
  ) {
    combineLatest(
      this.breakpointService.isMobileView$,
      this.configService.numberArray$.pipe(
        map(array => array.length >= 60),
        distinctUntilChanged()
      )
    )
    .pipe(
      map(([isMobileView, hasManyValues]) => isMobileView && hasManyValues),
      distinctUntilChanged()
    )
    .subscribe(crowded => this.isCrowded = crowded);

    configService.isColorized$
    .subscribe(colorized => this.isColorized = colorized);
  }


}
