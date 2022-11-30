import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'risto_app';

  ngOnInit() {
    var carouselRTL = false;
    if ($('body').hasClass('rtl')) { carouselRTL = true; }

    $(window).on('pluginCarouselReady', function () {
      $('#food-menu-carousel').owlCarousel({
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        items: 1,
        mouseDrag: false,
        dotsContainer: '#item-thumb',
        rtl: carouselRTL
      });

      $('#dessert-menu-carousel').owlCarousel({
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        items: 1,
        mouseDrag: false,
        dotsContainer: '#item-thumb1',
        rtl: carouselRTL
      });
    });

  }

}
