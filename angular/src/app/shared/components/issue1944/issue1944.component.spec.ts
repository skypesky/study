/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Issue1944Component } from './issue1944.component';

describe('Issue1944Component', () => {
  let component: Issue1944Component;
  let fixture: ComponentFixture<Issue1944Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Issue1944Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Issue1944Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
