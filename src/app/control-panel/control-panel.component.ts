import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  playIcon: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  togglePlayButton() {
    this.playIcon = !this.playIcon
  }

}
