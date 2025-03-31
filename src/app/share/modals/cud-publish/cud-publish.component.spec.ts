import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUDPublishComponent } from './cud-publish.component';

describe('CUDPublishComponent', () => {
  let component: CUDPublishComponent;
  let fixture: ComponentFixture<CUDPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CUDPublishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CUDPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
