import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTituloGeneralComponent } from './plantilla-titulo-general.component';

describe('PlantillaTituloGeneralComponent', () => {
  let component: PlantillaTituloGeneralComponent;
  let fixture: ComponentFixture<PlantillaTituloGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaTituloGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaTituloGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
