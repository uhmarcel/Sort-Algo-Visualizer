import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() onToggleMenu: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleToggleMenu() {
    this.onToggleMenu.emit();
  }
}
