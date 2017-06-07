var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432, // default port for postico
  max: 12
};

var pool = new pg.Pool(config);

router.get('/customers', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM customers;', function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT orders.id AS order_id, products.description AS item_name,' +
    'products.unit_price, line_items.quantity ' +
    'FROM customers ' +
    'JOIN addresses ON customers.id = addresses.customer_id ' +
    'JOIN orders ON addresses.id = orders.address_id ' +
    'JOIN line_items ON orders.id = line_items.order_id ' +
    'JOIN products ON line_items.product_id = products.id ' +
    'WHERE customers.id = ' + id + ';', function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});


module.exports = router;
