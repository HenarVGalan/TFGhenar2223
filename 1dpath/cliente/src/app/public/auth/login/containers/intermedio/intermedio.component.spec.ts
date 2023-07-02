import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermedioComponent } from './intermedio.component';

describe('IntermedioComponent', () => {
  let component: IntermedioComponent;
  let fixture: ComponentFixture<IntermedioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntermedioComponent]
    });
    fixture = TestBed.createComponent(IntermedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
