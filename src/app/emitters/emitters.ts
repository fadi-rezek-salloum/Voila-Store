import {EventEmitter} from '@angular/core';

export class Emitters {
  static authEmitter = new EventEmitter<boolean>();
  static cartEmitter = new EventEmitter<number>();
  static roleEmitter = new EventEmitter<boolean>();
}