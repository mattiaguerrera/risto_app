import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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
  displayedColumns: string[] = ['id','name', 'city', 'type', 'price', 'vote'];
  dataSource!: MatTableDataSource<Pub>;
  sub: Subscription;
  pubList: Pub[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
              private pubService: PubService) {
    this.sub = new Subscription(); 
    this.pubList = [];
  }

  ngOnInit() {  
    this.sub = this.pubService.get().subscribe({
      next: (data: Pub[]) => {
        this.dataSource = new MatTableDataSource(data);
        if(this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.pubList = data; // test
        }    
      },
      error: (error: any) => {
        console.log(error);
      }
    });         
  }

  ngAfterViewInit() {
    if(this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
