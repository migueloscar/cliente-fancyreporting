import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresEditablesComponent } from './valores-editables.component';

describe('ValoresEditablesComponent', () => {
  let component: ValoresEditablesComponent;
  let fixture: ComponentFixture<ValoresEditablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresEditablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresEditablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
