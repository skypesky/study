import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue1491Component } from './components/issue1491/issue1491.component';
import { Issue1469Component } from './components/issue1469/issue1469.component';
import { Issue1501Component } from './components/issue1501/issue1501.component';
import { Issue1521Component } from './components/issue1521/issue1521.component';
import { PopupDirective } from "./directives/popup/popup.directive";
import { TestComponent } from './components/test/test/test.component';
import { Issue1962Component } from './components/issue1962/issue1962.component';
import { Discussion1967Component } from './components/discussion1967/discussion1967.component';
import { Issue1944Component } from './components/issue1944/issue1944.component';
import { Discussions2004Component } from './components/discussions2004/discussions2004.component';
import { Issue2017Component } from './components/issue2017/issue2017.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Issue1491Component,
    Issue1501Component,
    Issue1469Component,
    Issue1521Component,
    Issue1962Component,
    Discussion1967Component,
    Issue1944Component,
    Discussions2004Component,
    PopupDirective,
    TestComponent,
    Issue2017Component,
  ],
  exports: [
    PopupDirective,
    TestComponent,
    Issue1491Component,
    Issue1501Component,
    Issue1469Component,
    Issue1521Component,
    Issue1962Component,
    Discussion1967Component,
    Issue1944Component,
    Discussions2004Component,
    Issue2017Component,
  ]
})
export class SharedModule { }
