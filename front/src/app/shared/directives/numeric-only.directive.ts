import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-numeric characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // If the input value has changed, update the input element
    if (numericValue !== inputValue) {
      this.renderer.setProperty(inputElement, 'value', numericValue);
    }
  }

}
