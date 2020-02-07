import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaLineChartComponent } from './plantilla-line-chart.component';

describe('PlantillaLineChartComponent', () => {
  let component: PlantillaLineChartComponent;
  let fixture: ComponentFixture<PlantillaLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
