import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDeclaracionComponent } from './registrar-declaracion.component';

describe('RegistrarDeclaracionComponent', () => {
  let component: RegistrarDeclaracionComponent;
  let fixture: ComponentFixture<RegistrarDeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDeclaracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
