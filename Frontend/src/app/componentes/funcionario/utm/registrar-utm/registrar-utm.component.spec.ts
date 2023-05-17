import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUtmComponent } from './registrar-utm.component';

describe('RegistrarUtmComponent', () => {
  let component: RegistrarUtmComponent;
  let fixture: ComponentFixture<RegistrarUtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarUtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
