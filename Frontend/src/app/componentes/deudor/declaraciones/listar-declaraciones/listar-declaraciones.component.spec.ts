import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDeclaracionesComponent } from './listar-declaraciones.component';

describe('ListarDeclaracionesComponent', () => {
  let component: ListarDeclaracionesComponent;
  let fixture: ComponentFixture<ListarDeclaracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDeclaracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDeclaracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
