import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUtmComponent } from './listar-utm.component';

describe('ListarUtmComponent', () => {
  let component: ListarUtmComponent;
  let fixture: ComponentFixture<ListarUtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
