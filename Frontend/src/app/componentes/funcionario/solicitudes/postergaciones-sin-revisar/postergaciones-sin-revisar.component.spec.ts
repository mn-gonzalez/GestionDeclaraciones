import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostergacionesSinRevisarComponent } from './postergaciones-sin-revisar.component';

describe('PostergacionesSinRevisarComponent', () => {
  let component: PostergacionesSinRevisarComponent;
  let fixture: ComponentFixture<PostergacionesSinRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostergacionesSinRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostergacionesSinRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
