import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Issue2017Component } from './issue2017.component';

describe('Issue2017Component', () => {
  let component: Issue2017Component;
  let fixture: ComponentFixture<Issue2017Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Issue2017Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Issue2017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
