import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeclaracionComponent } from './menu-declaracion.component';

describe('MenuDeclaracionComponent', () => {
  let component: MenuDeclaracionComponent;
  let fixture: ComponentFixture<MenuDeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeclaracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
