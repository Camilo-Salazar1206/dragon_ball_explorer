import { Component, EventEmitter, Output } from '@angular/core';
import { headerOption } from 'src/app/pages/home/enums/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
@Output() searchEvent = new EventEmitter<string>();


title:string=headerOption.IMG_TITLE;
headerOption=headerOption;
headerOptionsList = Object.values(headerOption);

onSearch(value: string): void {
  this.searchEvent.emit(value);
  console.log(value,'este es el valo que recibe de header ya ets abien en teoria')
}
}
