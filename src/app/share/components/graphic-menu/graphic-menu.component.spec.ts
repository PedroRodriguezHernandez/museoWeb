import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicMenuComponent } from './graphic-menu.component';

describe('GraphicMenuComponent', () => {
  let component: GraphicMenuComponent;
  let fixture: ComponentFixture<GraphicMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
