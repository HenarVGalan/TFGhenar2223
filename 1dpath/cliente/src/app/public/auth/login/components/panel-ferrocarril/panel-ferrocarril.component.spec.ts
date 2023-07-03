import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFerrocarrilComponent } from './panel-ferrocarril.component';

describe('PanelFerrocarrilComponent', () => {
  let component: PanelFerrocarrilComponent;
  let fixture: ComponentFixture<PanelFerrocarrilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelFerrocarrilComponent]
    });
    fixture = TestBed.createComponent(PanelFerrocarrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
