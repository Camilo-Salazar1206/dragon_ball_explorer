import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from './atoms/atoms.module';



@NgModule({
  declarations: [],
  imports: [
    AtomsModule,
    CommonModule
  ],exports: [
    AtomsModule
  ]
})
export class AtomicDesignModule { }
