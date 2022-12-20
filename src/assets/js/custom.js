var mainHanlder = {
  init: function () {
    this.scrollToTitle();
  },

  scrollToTitle: function () {
    console.log('scrollToTitle');
    const $goToTopEl = $('#goToTopTitle');
    let elementScrollSpeed = 1250,
      elementScrollEasing = 'easeInOutExpo';

    if (!elementScrollSpeed) { elementScrollSpeed = 700; }
    if (!elementScrollEasing) { elementScrollEasing = 'easeOutQuad'; }

    $('body,html').stop(true).animate({
      'scrollTop': $goToTopEl.offset().top - 150
    }, Number(elementScrollSpeed), elementScrollEasing);
    return false;
  }
};
module.exports = mainHanlder;