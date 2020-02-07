import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaParrafosComponent } from './plantilla-parrafos.component';

describe('PlantillaParrafosComponent', () => {
  let component: PlantillaParrafosComponent;
  let fixture: ComponentFixture<PlantillaParrafosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaParrafosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaParrafosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
