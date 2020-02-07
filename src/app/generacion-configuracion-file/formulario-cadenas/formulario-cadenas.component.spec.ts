import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadenasComponent } from './formulario-cadenas.component';

describe('FormularioCadenasComponent', () => {
  let component: FormularioCadenasComponent;
  let fixture: ComponentFixture<FormularioCadenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCadenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCadenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
