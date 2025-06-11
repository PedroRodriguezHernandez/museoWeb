import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicMultiCategoryComponentComponent } from './graphic-multi-category.component';

describe('GraphicMultiCategoryComponentComponent', () => {
  let component: GraphicMultiCategoryComponentComponent;
  let fixture: ComponentFixture<GraphicMultiCategoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicMultiCategoryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicMultiCategoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
