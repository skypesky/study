import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective {

  constructor(
    public elementRef: ElementRef, // 宿主的元素
  ) {
  }

}
