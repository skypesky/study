/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Discussions2004Component } from './discussions2004.component';

describe('Discussions2004Component', () => {
  let component: Discussions2004Component;
  let fixture: ComponentFixture<Discussions2004Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Discussions2004Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Discussions2004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
