import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesSinRevisarComponent } from './devoluciones-sin-revisar.component';

describe('DevolucionesSinRevisarComponent', () => {
  let component: DevolucionesSinRevisarComponent;
  let fixture: ComponentFixture<DevolucionesSinRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionesSinRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionesSinRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
