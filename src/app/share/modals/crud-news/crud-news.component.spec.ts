import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNewsComponent } from './crud-news.component';

describe('CrudNewsComponent', () => {
  let component: CrudNewsComponent;
  let fixture: ComponentFixture<CrudNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
