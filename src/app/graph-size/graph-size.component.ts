import { Component } from '@angular/core';
import { PlaybackService } from '../playback.service';

@Component({
  selector: 'app-graph-size',
  templateUrl: './graph-size.component.html',
  styleUrls: ['./graph-size.component.scss']
})
export class GraphSizeComponent {

  constructor(
    public readonly playbackService: PlaybackService,
  ) {}

}
