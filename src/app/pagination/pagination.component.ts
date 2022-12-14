import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";

declare function scrollToTitle(): any;

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() totalItems: number = 0;

  @Output() goTo = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();
  @Output() setShowedItems = new EventEmitter<number>();
  @Output() noItemsClicked = new EventEmitter<number>();

  public pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current);
  }

  public onPrevious(): void {
    this.previous.next(this.current);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 5) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }

  onOptionsSelected(value: string) {
    this.noItemsClicked.emit(Number(value));
    // if(script != undefined)  // TODO scroll to top after change?
    //   script.scrollToTitle();
    scrollToTitle();
  }

}
