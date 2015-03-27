(function (global) {

    "use strict";

    var Node_Mollie = require("mollie-api-node"),
        Classes = require('js-ext/js-ext.js').Classes, // full version
        Mollie;

    Mollie = Classes.createClass(
        function(api) {
            var instance = this;
            instance.mollieClient = new Node_Mollie.API.Client();
            instance.mollieClient.setApiKey(api);
        },
        {
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
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.IDEAL, config, orderid);
            },
            sendPaymentPAYSAFECARD: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.PAYSAFECARD, config, orderid);
            },
            sendPaymentCREDITCARD: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.CREDITCARD, config, orderid);
            },
            sendPaymentMISTERCASH: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.MISTERCASH, config, orderid);
            },
            sendPaymentBANKTRANSFER: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.BANKTRANSFER, config, orderid);
            },
            sendPaymentPAYPAL: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.PAYPAL, config, orderid);
            },
            sendPaymentBITCOIN: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.BITCOIN, config, orderid);
            },
            sendPaymentSOFORT: function(config, orderid) {
                return this._sendPaymentMethod(Node_Mollie.API.Object.Method.SOFORT, config, orderid);
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