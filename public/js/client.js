$(onReady);

function onReady() {
  // event listener
  // $('#customerList').on('click', '.showButton', showCustomers);

  showCustomers();
}

var showCustomers = function() {
  $.get('/orders')
  .done(getCustomers)
  .fail(weHaveFailed);
};

var getCustomers = function(customersList) {
  console.log(customersList);
  $('#customerList > tbody').empty();
  for(var i = 0; i < customersList.length; i++){
    var newRow = $('<tr>');
    newRow.data('customerId', customersList[i].id);
    newRow.append('<td>' + customersList[i].first_name + ' ' + customersList[i].last_name + '</td>');
    newRow.append('<td><input type="button" value="Show" class="btn btn-primary showButton" /></td>');
    $('#customerList > tbody').append(newRow);
  }
};




function weHaveFailed() {
  console.log('boo fail!');
}
