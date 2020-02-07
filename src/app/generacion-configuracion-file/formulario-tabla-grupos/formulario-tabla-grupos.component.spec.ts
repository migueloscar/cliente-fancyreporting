import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTablaGruposComponent } from './formulario-tabla-grupos.component';

describe('FormularioTablaGruposComponent', () => {
  let component: FormularioTablaGruposComponent;
  let fixture: ComponentFixture<FormularioTablaGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTablaGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTablaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
