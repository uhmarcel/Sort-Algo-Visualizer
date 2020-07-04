import { Component, OnInit } from '@angular/core';
import { PlaybackService } from '../playback.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  public isPlaying: boolean = false;

  constructor(
    private readonly playbackService: PlaybackService
  ) {
    this.playbackService.isPlaying$.subscribe(latest => (this.isPlaying = latest))
  }

  toggleStart() {
    if (!this.isPlaying) {
      this.playbackService.start();
    } else {
      this.playbackService.pause();
    }
  }

  handleNext() {
    this.playbackService.next();
  }

  handlePrevious() {
    this.playbackService.prev();
  }

  handleReset() {
    this.playbackService.reset();
  }

}
