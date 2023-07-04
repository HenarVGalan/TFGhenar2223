import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartObrasComponent } from './chart-obras.component';

describe('ChartObrasComponent', () => {
  let component: ChartObrasComponent;
  let fixture: ComponentFixture<ChartObrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartObrasComponent]
    });
    fixture = TestBed.createComponent(ChartObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
