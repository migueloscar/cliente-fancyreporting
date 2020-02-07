import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDatosComponent } from './seleccion-datos.component';

describe('SeleccionDatosComponent', () => {
  let component: SeleccionDatosComponent;
  let fixture: ComponentFixture<SeleccionDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
