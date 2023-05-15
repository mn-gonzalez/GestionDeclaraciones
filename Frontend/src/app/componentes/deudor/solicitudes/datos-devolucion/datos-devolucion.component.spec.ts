import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDevolucionComponent } from './datos-devolucion.component';

describe('DatosDevolucionComponent', () => {
  let component: DatosDevolucionComponent;
  let fixture: ComponentFixture<DatosDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
