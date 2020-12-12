import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMessageComponent } from './footer-message.component';

describe('FooterMessageComponent', () => {
  let component: FooterMessageComponent;
  let fixture: ComponentFixture<FooterMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
