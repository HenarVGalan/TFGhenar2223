import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaNetwork01TipoComponent } from './mapa-network01-tipo.component';

describe('MapaNetwork01TipoComponent', () => {
  let component: MapaNetwork01TipoComponent;
  let fixture: ComponentFixture<MapaNetwork01TipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaNetwork01TipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaNetwork01TipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
