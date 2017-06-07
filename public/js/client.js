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
  .done(showOrders)

  .fail(weHaveFailed);
};


var showOrders = function(ordersList) {
  console.log(ordersList);
  $('#orderList > tbody').empty();
  for(var i = 0; i < ordersList.length; i++){
    var newRow = $('<tr>');
    console.log(ordersList[i].order_date);
    newRow.append('<td>' + ordersList[i].order_id + '</td>');
    newRow.append('<td>' + ordersList[i].item_name + '</td>');
    newRow.append('<td>' + ordersList[i].unit_price + '</td>');
    newRow.append('<td>' + ordersList[i].quantity + '</td>');
    newRow.append('<td>' + '$' + (ordersList[i].unit_price *  ordersList[i].quantity ).toFixed(2) + '</td>');
    newRow.append('<td>' + ordersList[i].street + ' ' + ordersList[i].city + ', ' + ordersList[i].state + '  ' + ordersList[i].zip +  '</td>');
    $('#orderList > tbody').append(newRow);
    //orders.id AS order_id, products.description AS item_name,' +
    // 'products.unit_price, line_items.quantity
  }
};



function weHaveFailed() {
  console.log('boo fail!');
}
