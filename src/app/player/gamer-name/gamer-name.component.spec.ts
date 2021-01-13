import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerNameComponent } from './gamer-name.component';

describe('GamerNameComponent', () => {
  let component: GamerNameComponent;
  let fixture: ComponentFixture<GamerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
