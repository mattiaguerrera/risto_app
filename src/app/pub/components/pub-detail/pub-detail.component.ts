import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map, Subscription } from 'rxjs';
import { Pub } from '../../models/pub';
import { PubService } from '../../services/pub.service';


@Component({
  selector: 'app-pub-detail',
  templateUrl: './pub-detail.component.html',
  styleUrls: ['./pub-detail.component.scss']
})
export class PubDetailComponent {

  sub: Subscription;
  pub: Pub;

  pubForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    image: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    rankingPosition: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    priceLevel: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    category: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    rating: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    isClosed: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    address: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    cuisine: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    latitude: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    longitude: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    webUrl: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    website: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    numberOfReviews: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    isDeleted: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')])
  });

  constructor(private pubService: PubService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.sub = new Subscription();
    this.pub = this.initPub();
  }

  ngOnInit() {
    debugger;
    const id = this.data.id as number;
    if (id > 0) {
      this.sub = this.pubService.get()
        .pipe(
          map((pubs: any) => {
            let filteredP = pubs.filter(pub => pub.id === this.data.id);
            return filteredP;
          }
          )
        ).subscribe({
          next: (data: Pub[]) => {
            if (data) {
              this.pub = data[0];
            }
          },
          error: (error: any) => {
            console.log(error);
          }
        });
    }
  }

  onSubmit() {
    console.warn(this.pubForm.value);
    if (this.pubForm.valid) {
    }
  }

  private initPub() {
    return this.pub = {
      id: 0,
      name: '',
      image: '',
      rankingPosition: '',
      priceLevel: '',
      category: '',
      rating: 0,
      isClosed: false,
      phone: '',
      address: '',
      city: '',
      email: '',
      cuisine: [],
      latitude: '',
      longitude: '',
      webUrl: '',
      website: '',
      numberOfReviews: 0,
      isDeleted: false
    }
  }

}

