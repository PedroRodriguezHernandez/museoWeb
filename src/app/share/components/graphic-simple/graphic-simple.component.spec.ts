import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSimpleComponent } from './graphic-simple.component';

describe('GraphicSimpleComponent', () => {
  let component: GraphicSimpleComponent;
  let fixture: ComponentFixture<GraphicSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
