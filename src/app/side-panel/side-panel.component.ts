import { Component } from '@angular/core';
import sortingAlgorithms from '../algorithms';
import * as Constants from '../constants';
import { MatSelectionListChange } from '@angular/material/list';
import { ConfigService } from '../config.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  public readonly sortingAlgorithms = sortingAlgorithms;
  public readonly Constants = Constants;

  constructor(
    public readonly configService: ConfigService
  ) {}

  handleSelectionChange(event: MatSelectionListChange) {
    const nextAlgorithm = event.option.value;
    this.configService.setSortingAlgorithm(nextAlgorithm);
  }

  handleGenerateArray() {
    this.configService.randomizeNumberArray();
  }

  handleSizeRangeChange(event: MatSliderChange) {
    this.configService.randomizeNumberArrayWithSize(event.value);
  }

  handleSpeedRangeChange(event: MatSliderChange) {
    const interval = Constants.PLAYBACK_MAX_INTERVAL - event.value;
    this.configService.setPlaybackSpeed(interval);
  }



}
