import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureItemComponent } from './exposure-item.component';

describe('ExposureItemComponent', () => {
  let component: ExposureItemComponent;
  let fixture: ComponentFixture<ExposureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExposureItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExposureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
