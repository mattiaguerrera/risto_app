import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from './replace.pipe';
import { CityPipe } from './city.pipe';


@NgModule({
  declarations: [
    ReplacePipe,
    CityPipe
  ],
  exports: [
    ReplacePipe,
    CityPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
