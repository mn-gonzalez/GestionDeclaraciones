import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeclaracionComponent } from './datos-declaracion.component';

describe('DatosDeclaracionComponent', () => {
  let component: DatosDeclaracionComponent;
  let fixture: ComponentFixture<DatosDeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDeclaracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
