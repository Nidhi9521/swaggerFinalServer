"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PaymentDomain = void 0;
var users_1 = require("../model/users");
var booking_domain_1 = require("./booking_domain");
var dotenv = require("dotenv");
dotenv.config();
var razorpay_typescript_1 = require("razorpay-typescript");
var crypto = require("crypto");
var secretkey = process.env.KEY_SECRET;
var keyId = process.env.KEY_ID;
var instance = new razorpay_typescript_1.Razorpay({
    authKey: {
        key_id: keyId !== null && keyId !== void 0 ? keyId : "keyId",
        key_secret: secretkey !== null && secretkey !== void 0 ? secretkey : "secretkey"
    }
});
//const secret_key = 'yCKG9zsdIoWft58QwrYxjf1G'
var PaymentDomain = /** @class */ (function () {
    function PaymentDomain() {
    }
    PaymentDomain.prototype.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, options, uid, userData, response, orderData, bookIngDomain, resBooking, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = req.body.amount;
                        options = {
                            amount: amount * 100,
                            currency: 'INR'
                        };
                        console.log(options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        uid = "qeTBCkvbSjRgzYTYEOdPkhynaY33";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 2:
                        userData = _a.sent();
                        return [4 /*yield*/, instance.orders.create(options)];
                    case 3:
                        response = _a.sent();
                        orderData = {
                            order_id: response.id,
                            currency: response.currency,
                            amount: response.amount / 100,
                            user_name: userData[0].user_name,
                            user_email: userData[0].user_email,
                            user_phone_number: userData[0].user_phone_number
                        };
                        bookIngDomain = new booking_domain_1.BookingDomain();
                        return [4 /*yield*/, bookIngDomain.bookingFreeze(req, res, req.body.cin, req.body.cout, req.body.room_id, req.body.hotel_id, req.body.price, response.id, req.body.coupon_id)];
                    case 4:
                        resBooking = _a.sent();
                        if (resBooking != 0) {
                            console.log(resBooking);
                            console.log(orderData);
                            res.send(orderData);
                            setTimeout(bookIngDomain.bookingFreezFail, 300000, resBooking);
                        }
                        else {
                            res.status(400).send('faile');
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log("hy");
                        console.log(error_1);
                        res.status(400).send('Unable to create order');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PaymentDomain.prototype.verifypayment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, paymentId, body, expectedSignature, response;
            return __generator(this, function (_a) {
                orderId = req.body.orderId;
                paymentId = req.body.paymentId;
                body = orderId + "|" + paymentId;
                expectedSignature = crypto.createHmac('sha256', secretkey).update(body.toString()).digest("hex");
                console.log("sig", req.body.razorpay_signature);
                console.log("sig", req.body.expectedSignature);
                response = { status: "failure" };
                if (expectedSignature === req.body.razorpay_signature) {
                    response = { status: "sucess" };
                    res.send(response);
                }
                return [2 /*return*/];
            });
        });
    };
    return PaymentDomain;
}());
exports.PaymentDomain = PaymentDomain;
