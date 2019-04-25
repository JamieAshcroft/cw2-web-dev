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
  const list = $('#reviews');
  const promise = $.ajax('https://student.computing.edgehill.ac.uk/~walshd/cis1110api/product-reviews/bikeoil');
  
  /**
   * Creates the rating to show on HTML
   * @param {number} stars Number of red starts needed
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
    const response = `<span style="color: red;">${redStars}</span>${blackStars}`
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
    
    for (let i = 0; i < 5; i++) {
      list.append(`
        <li>
          <div class="profile-img">Image</div>
          <div class="rating">${setStars(data[i].rating)}</div> 
          <div class="name">${data[i].nickname}</div>
          <div class="review">${data[i].review}</div>
        </li>
      `);
    }

    $('#readAll').click(() => {
      if (!clicked) {
        for (let i = 5; i < data.length; i++) {
          list.append(`
            <li id="new">
              <div class="profile-img">Image</div>
              <div class="rating">${setStars(data[i].rating)}</div> 
              <div class="name">${data[i].nickname}</div>
              <div class="review">${data[i].review}</div>
            </li>
          `);
        };
        clicked = true;
        $('#readAll').html('Hide reviews');
      } else {
        $("#reviews li#new").remove();
        clicked = false;
        $('#readAll').html('Read All Reviews');
      }
    });
  });
});
