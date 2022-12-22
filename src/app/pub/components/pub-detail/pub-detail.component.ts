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
  pubForm: FormGroup;

  constructor(private pubService: PubService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.sub = new Subscription();
    this.pub = this.initPubModel();
    this.pubForm = new FormGroup({});
  }

  ngOnInit() {
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
              this.fillFormGroup(data[0]);
            }

          },
          error: (error: any) => {
            console.log(error);
          }
        });
    }
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.pubForm?.value);
    if (this.pubForm?.valid) {
    }
  }

  fillFormGroup(pub: Pub) {

    this.pubForm = this.fb.group({
      name: ['', Validators.required],
      image: [pub.image, Validators.required],
      rankingPosition: [pub.rankingPosition, [Validators.required, Validators.pattern('/^[0-9]\d*$/')]],
      priceLevel: [pub.priceLevel, Validators.required],
      category: [pub.category, [Validators.required, Validators.pattern('[a-zA-Z].*')]],
      rating: [pub.rating, [Validators.required, Validators.pattern('^[0-5]$')]],
      isClosed: [pub.isClosed],
      phone: [pub.phone],
      address: [pub.address, Validators.required],
      city: [pub.city, Validators.required],
      email: [pub.email, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      cuisine: [pub.cuisine],
      latitude: [pub.latitude, Validators.pattern('^(\d+(?:[\.\,]\d{6})?)$')],
      longitude: [pub.longitude, Validators.pattern('^(\d+(?:[\.\,]\d{6})?)$')],
      webUrl: [pub.webUrl],
      website: [pub.website],
      numberOfReviews: [pub.numberOfReviews, [Validators.required, Validators.pattern('/^[0-9]\d*$/')]],
      isDeleted: [pub.isDeleted]
    });
  }

  private initPubModel(): Pub {
    return {
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

