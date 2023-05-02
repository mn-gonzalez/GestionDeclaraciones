import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionesPorRevisarComponent } from './declaraciones-por-revisar.component';

describe('DeclaracionesPorRevisarComponent', () => {
  let component: DeclaracionesPorRevisarComponent;
  let fixture: ComponentFixture<DeclaracionesPorRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionesPorRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionesPorRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
