import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDeudorComponent } from './inicio-deudor.component';

describe('InicioDeudorComponent', () => {
  let component: InicioDeudorComponent;
  let fixture: ComponentFixture<InicioDeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioDeudorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
