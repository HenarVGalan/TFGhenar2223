import { Component,Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  
 
  // private static readonly DARK_THEME_CLASS = 'dark-theme';
  // private static readonly DARK_THEME_LIGHT = 'light';
  // private static readonly DARK_THEME_DARK = 'dark';

  // public theme: string;

  // constructor(@Inject(DOCUMENT) private document: Document) {
  //     this.theme = this.document.documentElement.classList.contains(SettingsComponent.DARK_THEME_CLASS) ? SettingsComponent.DARK_THEME_DARK : SettingsComponent.DARK_THEME_LIGHT;
  // }

  // public selectDarkTheme(): void {
  //     this.document.documentElement.classList.add(SettingsComponent.DARK_THEME_CLASS);
  //     this.theme = SettingsComponent.DARK_THEME_DARK;
  // }

  // public selectLightTheme(): void {
  //     this.document.documentElement.classList.remove(SettingsComponent.DARK_THEME_CLASS);
  //     this.theme = SettingsComponent.DARK_THEME_LIGHT;
  // }
}
