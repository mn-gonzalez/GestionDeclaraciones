import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPostergacionComponent } from './registrar-postergacion.component';

describe('RegistrarPostergacionComponent', () => {
  let component: RegistrarPostergacionComponent;
  let fixture: ComponentFixture<RegistrarPostergacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPostergacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPostergacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
