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
export class PubCatalogComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'city', 'type', 'price', 'vote'];
  // dataSource!: MatTableDataSource<Pub>;
  sub: Subscription;
  pubs: Pub[] = [];

  /* Pagination */
  public current = 1;
  public itemsToDisplay: Pub[] = [];
  public perPage = 10;
  public total = 0;


  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private pubService: PubService) {
    this.sub = new Subscription();
    this.pubs = [];
  }

  ngOnInit() {
    this.sub = this.pubService.get().subscribe({
      next: (data: Pub[]) => {
        // this.dataSource = new MatTableDataSource(data);
        // if (this.dataSource) {
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;          
        //}
        if (data) {
          this.pubs = data;
          this.itemsToDisplay = this.paginate(this.current, this.perPage);
          this.total = Math.ceil(this.pubs.length / this.perPage);
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngAfterViewInit() {
    // if (this.dataSource) {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
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
    return items;
  }
}
