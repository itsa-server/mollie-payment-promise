(function (global) {

    "use strict";

    var Node_Mollie = require("mollie-api-node"),
        Classes = require('js-ext/js-ext.js').Classes, // full version
        Node_Mollie_Method = Node_Mollie.API.Object.Method,
        Mollie;

    Mollie = Classes.createClass(
        function(api) {
            var instance = this;
            instance.mollieClient = new Node_Mollie.API.Client();
            instance.mollieClient.setApiKey(api);
        },
        {
            methods: {
                IDEAL: Node_Mollie_Method.IDEAL,
                PAYSAFECARD: Node_Mollie_Method.PAYSAFECARD,
                CREDITCARD: Node_Mollie_Method.CREDITCARD,
                MISTERCASH: Node_Mollie_Method.MISTERCASH,
                BANKTRANSFER: Node_Mollie_Method.BANKTRANSFER,
                PAYPAL: Node_Mollie_Method.PAYPAL,
                BITCOIN: Node_Mollie_Method.BITCOIN,
                SOFORT: Node_Mollie_Method.SOFORT
            },
            sendPayment: function(config) {
                var instance = this;
                return new global.Promise(function(resolve, reject) {
                    instance.mollieClient.payments.create(config, function(payment) {
                        if (payment.error) {
                            reject(payment.error);
                        }
                        else {
                            resolve(payment);
                        }
                    });

                });
            },
            sendPaymentIDEAL: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.IDEAL, config, orderid);
            },
            sendPaymentPAYSAFECARD: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.PAYSAFECARD, config, orderid);
            },
            sendPaymentCREDITCARD: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.CREDITCARD, config, orderid);
            },
            sendPaymentMISTERCASH: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.MISTERCASH, config, orderid);
            },
            sendPaymentBANKTRANSFER: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.BANKTRANSFER, config, orderid);
            },
            sendPaymentPAYPAL: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.PAYPAL, config, orderid);
            },
            sendPaymentBITCOIN: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.BITCOIN, config, orderid);
            },
            sendPaymentSOFORT: function(config, orderid) {
                return this._sendPaymentMethod(this.methods.SOFORT, config, orderid);
            },
            verifyPayment: function(paymentId) {
                var instance = this;
                return new global.Promise(function(resolve, reject) {
                     instance.mollieClient.payments.get(paymentId, function(payment) {
                        if (payment.error) {
                            reject(payment.error);
                        }
                        else {
                            resolve(payment);
                        }
                    });

                });
            },
            getPaymentHistory: function() {
                var instance = this;
                return new global.Promise(function(resolve, reject) {
                     instance.mollieClient.payments.all(function(payments) {
                        if (payments.error) {
                            reject(payments.error);
                        }
                        else {
                            resolve(payments);
                        }
                    });

                });
            },
            getPaymentMethods: function() {
                var instance = this;
                return new global.Promise(function(resolve, reject) {
                     instance.mollieClient.methods.all(function(methods) {
                        if (methods.error) {
                            reject(methods.error);
                        }
                        else {
                            resolve(methods);
                        }
                    });

                });
            },
            _sendPaymentMethod: function(method, config, orderid) {
                config || (config={});
                config.method = method;
                config.metadata || (config.metadata={});
                config.metadata.orderid = orderid;
                return this.sendPayment(config);
            }
        }
    );

    module.exports = Mollie;

}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));