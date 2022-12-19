import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pub } from '../../models/pub';
import { PubService } from '../../services/pub.service';
@Component({
  selector: 'app-pub-catalog',
  templateUrl: './pub-catalog.component.html',
  styleUrls: ['./pub-catalog.component.scss']
})
export class PubCatalogComponent {
  displayedColumns: string[] = ['id', 'name', 'city', 'type', 'price', 'vote'];
  sub: Subscription;
  pubs: Pub[] = [];

  /* Pagination */
  public current = 1;
  public itemsToDisplay: Pub[] = [];
  public perPage = 25;
  public total = 25;
  public totalItems = 25;
  public selectedNoItems = 0;

  constructor(private router: Router,
    private pubService: PubService) {
    this.sub = new Subscription();
    this.pubs = [];
  }

  ngOnInit() {
    this.sub = this.pubService.get().subscribe({
      next: (data: Pub[]) => {
        if (data) {
          this.pubs = data;
          this.initView();
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  initView() {
    if(this.pubs) {
      this.itemsToDisplay = this.paginate(this.current, this.perPage);
      this.total = Math.ceil(this.pubs.length / this.perPage);
      this.totalItems = this.pubs.length;
    }    
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  /* Pagination Methods */
  public onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public paginate(current: number, perPage: number): Pub[] {
    this.itemsToDisplay = this.pubs;
    const items = [...this.itemsToDisplay.slice((current - 1) * perPage).slice(0, perPage)];
    console.log(items.length);
    return items;
  }

  setNoItems(noSelected: number) {
    this.perPage = noSelected;
    this.initView();
  }
}
