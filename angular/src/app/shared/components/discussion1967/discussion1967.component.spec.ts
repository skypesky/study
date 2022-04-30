/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Discussion1967Component } from './discussion1967.component';

describe('Discussion1967Component', () => {
  let component: Discussion1967Component;
  let fixture: ComponentFixture<Discussion1967Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Discussion1967Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Discussion1967Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
