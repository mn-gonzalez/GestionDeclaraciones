import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPostergacionesComponent } from './listar-postergaciones.component';

describe('ListarPostergacionesComponent', () => {
  let component: ListarPostergacionesComponent;
  let fixture: ComponentFixture<ListarPostergacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPostergacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPostergacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
