import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionesEnRevisionComponent } from './declaraciones-en-revision.component';

describe('DeclaracionesEnRevisionComponent', () => {
  let component: DeclaracionesEnRevisionComponent;
  let fixture: ComponentFixture<DeclaracionesEnRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionesEnRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionesEnRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
