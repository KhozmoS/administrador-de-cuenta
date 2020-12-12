import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFrameComponent } from './top-frame.component';

describe('TopFrameComponent', () => {
  let component: TopFrameComponent;
  let fixture: ComponentFixture<TopFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
