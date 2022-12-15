import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating = 0;
  starWidth = 0;

  ngOnChanges(): void {
    this.starWidth = this.rating * 100 / 5;
  }
  
  onClick(): void {
    console.log(`The rating ${this.rating} was clicked!`);
  }
}
