/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Issue1962Component } from './issue1962.component';

describe('Issue1962Component', () => {
  let component: Issue1962Component;
  let fixture: ComponentFixture<Issue1962Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Issue1962Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Issue1962Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
