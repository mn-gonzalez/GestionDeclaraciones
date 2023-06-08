import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesRevisadasComponent } from './devoluciones-revisadas.component';

describe('DevolucionesRevisadasComponent', () => {
  let component: DevolucionesRevisadasComponent;
  let fixture: ComponentFixture<DevolucionesRevisadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionesRevisadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionesRevisadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
