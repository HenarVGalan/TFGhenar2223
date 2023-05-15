import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItems } from '../core/shared/menu-items';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  @ViewChild('snav', { static: true }) sidenav: MatSidenav | undefined;
  showFiller = false;
  //opened = false;
  opened: boolean = false;

  constructor(public menuItems: MenuItems) { }

  ngOnInit(): void {
  }

  onMenuClicked() {
    //this.opened = true;
    // this.opened = !this.opened;
    // console.log(this.opened);
    this.sidenav?.toggle();
  }

  // ngAfterViewInit() {
  //   this.toolbar.openSidenav.subscribe(() => {
  //     this.sidenav.open();
  //   });
  // }
}
