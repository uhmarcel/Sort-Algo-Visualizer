import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphColorComponent } from './graph-color/graph-color.component';
import { BarStylePipe } from './graph-color/bar-style.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidePanelComponent,
    ControlPanelComponent,
    NavBarComponent,
    GraphColorComponent,
    BarStylePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    KatexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
