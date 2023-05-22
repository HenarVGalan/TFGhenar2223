import { Component, EventEmitter, Output } from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() openSidenav = new EventEmitter<void>();
  constructor(public dialog: MatDialog) { }
  onMenuClick() {
    this.openSidenav.emit();
    // console.log("onMenuClick");
  }

  openSettings() {
    this.dialog.open(SettingsComponent);
  }
}
