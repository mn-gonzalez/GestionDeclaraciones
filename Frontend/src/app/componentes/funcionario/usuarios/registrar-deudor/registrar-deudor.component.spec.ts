import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDeudorComponent } from './registrar-deudor.component';

describe('RegistrarDeudorComponent', () => {
  let component: RegistrarDeudorComponent;
  let fixture: ComponentFixture<RegistrarDeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDeudorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
