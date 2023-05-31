import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionesEnCorreccionComponent } from './declaraciones-en-correccion.component';

describe('DeclaracionesEnCorreccionComponent', () => {
  let component: DeclaracionesEnCorreccionComponent;
  let fixture: ComponentFixture<DeclaracionesEnCorreccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionesEnCorreccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionesEnCorreccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
