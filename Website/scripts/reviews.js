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

$(document).on('ready', function() {
  var list = document.getElementById('reviews');
  var promise = $.ajax('https://student.computing.edgehill.ac.uk/~walshd/cis1110api/product-reviews/bikeoil');
  promise.done(function(data) {
    for(var idx = 0; idx < data.length; idx++) {
     list.append('<li>' + data[idx].nickname + '</li>');
     list.append('<li>' + data[idx].review + '</li>');
    }
  });
});
