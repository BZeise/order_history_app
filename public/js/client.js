$(onReady);

function onReady() {
  // event listener
  $('#customerList').on('click', '.showButton', getOrders);

  getCustomers();
}

var getCustomers = function() {
  $.get('/orders/customers')
  .done(showCustomers)
  .fail(weHaveFailed);
};

var showCustomers = function(customersList) {
  console.log('customersList is: ', customersList);
  $('#customerList > tbody').empty();
  for(var i = 0; i < customersList.length; i++){
    var newRow = $('<tr class="custRow">');
    newRow.data('customerId', customersList[i].id);
    newRow.append('<td>' + customersList[i].first_name + ' ' + customersList[i].last_name + '</td>');
    newRow.append('<td><input type="button" value="Show" class="btn btn-primary showButton" /></td>');
    $('#customerList > tbody').append(newRow);
  }
};

var getOrders = function() {
  var inOneLine = $(this).parent().parent().data().customerId;
  $.get('/orders/' + inOneLine)
  .done(logFunction)
  //.done(showOrders)
  .fail(weHaveFailed);
};

var logFunction = function(thingie){
  console.log("We did it!");
  console.log(thingie);
};

var showOrders = function(ordersList) {
  console.log(ordersList);
  $('#customerList > tbody').empty();
  for(var i = 0; i < ordersList.length; i++){
    var newRow = $('<tr>');
    newRow.data('customerId', ordersList[i].id);
    newRow.append('<td>' + ordersList[i].id + '</td>');
    newRow.append('<td><input type="button" value="Show" class="btn btn-primary showButton" /></td>');
    $('#orderList > tbody').append(newRow);
    //orders.id AS order_id, products.description AS item_name,' +
    // 'products.unit_price, line_items.quantity
  }
};



function weHaveFailed() {
  console.log('boo fail!');
}
