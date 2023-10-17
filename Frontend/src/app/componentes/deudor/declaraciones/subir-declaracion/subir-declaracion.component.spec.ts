import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirDeclaracionComponent } from './subir-declaracion.component';

describe('SubirDeclaracionComponent', () => {
  let component: SubirDeclaracionComponent;
  let fixture: ComponentFixture<SubirDeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirDeclaracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirDeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
