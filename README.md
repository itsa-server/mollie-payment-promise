# mollie-payment-promise
Promise-wrapper arround mollie-api-node for internet payments
You can use the

See [Mollie Payment](https://www.mollie.com)

```js
var Mollie = require('itsa-mollie-payment-promise'),
    MOLLIE_API = 'your_api',
    mollie = new Mollie(MOLLIE_API),
    orderConfig, orderId;
    redirectUrl: 'http://' + request.headers.host + '/bestelling-afronden/' + orderid,

app.get('/order', function(request, response)
    var orderId = request.params.orderid,
        domain = request.headers.host,
        amount = request.params.amount, // DO NOT use request-data, but calculate from your database
        orderConfig;

    orderConfig = {
        amount: 15.95,
        description: 'Your order at '+domain,
        method: mollie.methods.CREDITCARD,
        redirectUrl: 'https://' + domain + '/complete-order/' + orderid,
        metadata: {
            orderid: orderid
        }
    };

    mollie.sendPayment(orderConfig).then(function(paymentURL) {
        response.redirect(paymentURL);
    });
};

```