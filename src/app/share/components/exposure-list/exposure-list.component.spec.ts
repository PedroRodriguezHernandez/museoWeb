import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureListComponent } from './exposure-list.component';

describe('ExposureListComponent', () => {
  let component: ExposureListComponent;
  let fixture: ComponentFixture<ExposureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExposureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExposureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
