'use strict'
/*function reviews(list_item) {
  var list = list_item.find('ol');
  list.empty();
  var promise = $.ajax('https://student.computing.edgehill.ac.uk/~walshd/cis1110api/product-reviews/bikeoil');
  promise.done(function(data) {
    for(var idx = 0; idx < data.length; idx++) {
     list.append('<li>' + data[idx].nickname + '</li>');
     list.append('<li>' + data[idx].review + '</li>');
    }
  });
}
*/

// $(document).on('ready', function() {
//   var list = document.getElementById('reviews');
//   var promise = $.ajax('https://student.computing.edgehill.ac.uk/~walshd/cis1110api/product-reviews/bikeoil');
//   promise.done(function(data) {
//     for(var idx = 0; idx < data.length; idx++) {
//      list.append('<li>' + data[idx].nickname + '</li>');
//      list.append('<li>' + data[idx].review + '</li>');
//     }
//   });
// });

$(document).on('ready', () => {
  const list = $('.wrapper');
  const promise = $.ajax('https://student.computing.edgehill.ac.uk/~walshd/cis1110api/product-reviews/bikeoil');

  /**
   * Creates the rating to show on HTML
   * @param {number} stars Number of red stars needed
   */
  const setStars = (stars) => {
    let redStars = '';
    let blackStars = '';
    for (let i = 0; i < stars; i++) {
      redStars += '★';
    }
    if (redStars.length <= 4) {
      const left = 5 - redStars.length;
      for (let i = 0; i < left; i++) {
        blackStars += '★';
      }
    }
    const response = `<span style="color: #C5110B;">${redStars}</span>${blackStars}`
    return response;
  }

  /**
   * Gets the mean of all the ratings ready for displaying the amount of stars
   * @param {*} data Data from Ajax call to get rating
   */
  const overAllRating = (data) => {
    let total = 0, i = 0;
    for (i = 0; i < data.length; i++) {
      total += parseInt(data[i].rating);
    }
    return parseInt(total / data.length + 1);
  }

  promise.done(data => {
    let clicked = false;

    /**
     * Gets Overall rating and sets it on the HTML
     */
    const overall = overAllRating(data);
    $('#overAllReviews').html(setStars(overall));

    /**
     * Creates all the elements and places them within the 'list'
     */
    for (let i = 0; i < 5; i++) {

      list.append(`
          <div class="profile-img"><img src="images/reviewicon1.jpg"></div>
          <div class="rating">${setStars(data[i].rating)}</div>
          <div class="name">${data[i].nickname}</div>
          <div class="review">${data[i].review}</div>
          <hr>
      `);
    }
    /**
     * Adds a loop for the button to display extra reviews when button is clicked, also removes them when button is clicked again
     */
    $('#readAll').click(() => {
      if (!clicked) {
        for (let i = 5; i < data.length; i++) {
          list.append(`
              <div class="profile-img new"><img src="images/reviewicon1.jpg"></div>
              <div class="rating new">${setStars(data[i].rating)}</div>
              <div class="name new">${data[i].nickname}</div>
              <div class="review new">${data[i].review}</div>
              <hr class="new">
          `);
        };
        clicked = true;
        $('#readAll').html('HIDE REVIEWS');
      } else {
        $(".wrapper .new").remove();
        clicked = false;
        $('#readAll').html('READ ALL REVIEWS');
      }
    });
  });
});
