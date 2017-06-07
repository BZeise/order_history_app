$(onReady);

function onReady() {
  // event listener
  $('#customerList').on('click', '.showButton', showOrders);

}

var showOrders = function() {
  $.get('/orders')
  .done(getOrders)
  .fail(weHaveFailed);
};

var getOrders = function(ordersList) {
  console.log(ordersList);
};




function weHaveFailed() {
  console.log('boo fail!');
}
