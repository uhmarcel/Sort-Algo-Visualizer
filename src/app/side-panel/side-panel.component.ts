import { Component } from '@angular/core';
import sortingAlgorithms from '../algorithms';
import { DEFAULT_ALGORITHM } from '../constants';
import { MatSelectionListChange } from '@angular/material/list';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  public readonly sortingAlgorithms = sortingAlgorithms;
  public selected = DEFAULT_ALGORITHM;

  constructor(
    private readonly configService: ConfigService
  ) {}

  handleSelectionChange(event: MatSelectionListChange) {
    const nextAlgorithm = event.option.value;
    this.configService.setSortingAlgorithm(nextAlgorithm);
  }

}
