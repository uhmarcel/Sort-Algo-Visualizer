import { Component } from '@angular/core';
import { PlaybackService } from '../playback.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

  constructor(
    public readonly playbackService: PlaybackService,
  ) {}

}
