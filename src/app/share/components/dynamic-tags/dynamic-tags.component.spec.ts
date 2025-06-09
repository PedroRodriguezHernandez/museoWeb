import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTagsComponent } from './dynamic-tags.component';

describe('DynamicTagsComponent', () => {
  let component: DynamicTagsComponent;
  let fixture: ComponentFixture<DynamicTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
