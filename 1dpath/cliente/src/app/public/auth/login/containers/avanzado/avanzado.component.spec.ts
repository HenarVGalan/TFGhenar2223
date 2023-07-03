import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanzadoComponent } from './avanzado.component';

describe('AvanzadoComponent', () => {
  let component: AvanzadoComponent;
  let fixture: ComponentFixture<AvanzadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvanzadoComponent]
    });
    fixture = TestBed.createComponent(AvanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
