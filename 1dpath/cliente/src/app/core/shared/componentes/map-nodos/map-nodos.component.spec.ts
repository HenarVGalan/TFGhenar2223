import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNodosComponent } from './map-nodos.component';

describe('MapNodosComponent', () => {
  let component: MapNodosComponent;
  let fixture: ComponentFixture<MapNodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapNodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapNodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
