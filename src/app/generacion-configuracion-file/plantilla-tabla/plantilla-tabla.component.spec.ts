import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTablaComponent } from './plantilla-tabla.component';

describe('PlantillaTablaComponent', () => {
  let component: PlantillaTablaComponent;
  let fixture: ComponentFixture<PlantillaTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
