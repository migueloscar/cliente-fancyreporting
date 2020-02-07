import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarArchivoConfiguracionComponent } from './descargar-archivo-configuracion.component';

describe('DescargarArchivoConfiguracionComponent', () => {
  let component: DescargarArchivoConfiguracionComponent;
  let fixture: ComponentFixture<DescargarArchivoConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarArchivoConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarArchivoConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
