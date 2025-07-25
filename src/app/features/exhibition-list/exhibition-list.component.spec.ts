import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionListComponent } from './exhibition-list.component';

describe('ExhibitionListComponent', () => {
  let component: ExhibitionListComponent;
  let fixture: ComponentFixture<ExhibitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
