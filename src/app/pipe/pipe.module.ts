import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplacePipe } from './replace.pipe';
import { CityPipe } from './city.pipe';
import { TrimPipe } from './trim.pipe';


@NgModule({
  declarations: [
    ReplacePipe,
    CityPipe,
    TrimPipe
  ],
  exports: [
    ReplacePipe,
    CityPipe,
    TrimPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
