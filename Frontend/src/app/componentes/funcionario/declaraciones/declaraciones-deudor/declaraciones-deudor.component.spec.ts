import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionesDeudorComponent } from './declaraciones-deudor.component';

describe('DeclaracionesDeudorComponent', () => {
  let component: DeclaracionesDeudorComponent;
  let fixture: ComponentFixture<DeclaracionesDeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionesDeudorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionesDeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
