import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaFerrocarrilComponent } from './mapa-ferrocarril.component';

describe('MapaFerrocarrilComponent', () => {
  let component: MapaFerrocarrilComponent;
  let fixture: ComponentFixture<MapaFerrocarrilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaFerrocarrilComponent]
    });
    fixture = TestBed.createComponent(MapaFerrocarrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
