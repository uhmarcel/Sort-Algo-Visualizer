import { Component, EventEmitter, Output } from '@angular/core';
import { GITHUB_PAGE_URL } from '../constants';
import { ConfigService } from '../config.service';
import { BreakpointService } from '../breakpoint.service';
import * as Constants from '../constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Output() onToggleMenu: EventEmitter<any> = new EventEmitter();
  public readonly Constants = Constants;

  constructor(
    public readonly configService: ConfigService,
    public readonly breakpointService: BreakpointService,
  ) {}

  handleToggleMenu() {
    this.onToggleMenu.emit();
  }

  openGithubPage() {
    window.open(GITHUB_PAGE_URL, "_blank");
  }
}
