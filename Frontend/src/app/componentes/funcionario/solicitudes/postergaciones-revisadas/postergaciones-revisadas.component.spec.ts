import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostergacionesRevisadasComponent } from './postergaciones-revisadas.component';

describe('PostergacionesRevisadasComponent', () => {
  let component: PostergacionesRevisadasComponent;
  let fixture: ComponentFixture<PostergacionesRevisadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostergacionesRevisadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostergacionesRevisadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
