import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPostergacionComponent } from './datos-postergacion.component';

describe('DatosPostergacionComponent', () => {
  let component: DatosPostergacionComponent;
  let fixture: ComponentFixture<DatosPostergacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPostergacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPostergacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
