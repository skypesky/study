import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Issue1501Component } from './issue1501.component';

describe('Issue1501Component', () => {
  let component: Issue1501Component;
  let fixture: ComponentFixture<Issue1501Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Issue1501Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Issue1501Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
