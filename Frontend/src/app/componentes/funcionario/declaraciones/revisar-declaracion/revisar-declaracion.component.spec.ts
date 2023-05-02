import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarDeclaracionComponent } from './revisar-declaracion.component';

describe('RevisarDeclaracionComponent', () => {
  let component: RevisarDeclaracionComponent;
  let fixture: ComponentFixture<RevisarDeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarDeclaracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarDeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
