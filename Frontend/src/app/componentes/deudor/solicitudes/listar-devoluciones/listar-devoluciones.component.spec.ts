import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDevolucionesComponent } from './listar-devoluciones.component';

describe('ListarDevolucionesComponent', () => {
  let component: ListarDevolucionesComponent;
  let fixture: ComponentFixture<ListarDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDevolucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
