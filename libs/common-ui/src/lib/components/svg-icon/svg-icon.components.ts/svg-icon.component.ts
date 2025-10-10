import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [''],
  standalone: true,
})
export class SvgIconComnonent {
  @Input() icon = '';

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
