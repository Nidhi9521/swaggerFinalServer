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
exports.WebhookDomain = void 0;
var booking_1 = require("../model/booking");
var statuscode_1 = require("../statuscode");
var WebhookDomain = /** @class */ (function () {
    function WebhookDomain() {
    }
    WebhookDomain.prototype.verifyPayment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var SECRET, paymentstatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SECRET = '123456';
                        console.log(req.body);
                        console.log(req.body.payload);
                        if (!(req.body.payload.payment.entity.status == "captured")) return [3 /*break*/, 4];
                        console.log(req.body.payload.payment.entity.status);
                        console.log(req.body.payload.payment.entity.order_id);
                        return [4 /*yield*/, booking_1.bookingmodel.findOne({ $and: [{ "orderId": req.body.payload.payment.entity.order_id }, { status: "pending" }] })];
                    case 1:
                        paymentstatus = _a.sent();
                        console.log(paymentstatus);
                        if (!(paymentstatus != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, booking_1.bookingmodel.updateOne({
                                "orderId": req.body.payload.payment.entity.order_id
                            }, {
                                $set: {
                                    status: "success",
                                    paymentId: req.body.payload.payment.entity.id
                                }
                            })];
                    case 2:
                        _a.sent();
                        // ****************************** FOR NOTIFICATION ****************************** //
                        // var requiredData: any = await bookingmodel.findOne({ "orderId": req.body.payload.payment.entity.order_id, }).populate('user_id');
                        // const notificationId = requiredData?._id
                        // const notification_options = {
                        //     priority: "high",
                        //     timeToLive: 60 * 60 * 24
                        // };
                        // // To find FCM token
                        // var userDevices = await devicemodel.find({ useruid: requiredData?.user_id._id });
                        // var registrationToken: any = [];
                        // userDevices.forEach(element => {
                        //     registrationToken.push(element.fcmtoken);
                        // });
                        // const options = notification_options
                        // var userData: String = requiredData?.user_id.user_name
                        // var hotelData: String = requiredData?.hotel_id.hotel_name
                        // var checkinDate = requiredData?.checkin_date
                        // var checkoutDate = requiredData?.checkout_date
                        // const bookingSuccessfullMessage = {
                        //     "data": { "key": "booking" },
                        //     "notification": {
                        //         "title": "Booking successfull",
                        //         "body": `Hi ${userData}, thanks for choosing to stay at ${hotelData}`
                        //     }
                        // }
                        // const before24hrsmessage = {
                        //     "data": { "key": "booking" },
                        //     "notification": {
                        //         "title": "24 hours remaining",
                        //         "body": `Hi ${userData}, 24 hours remaining of your booking at ${hotelData}`
                        //     }
                        // }
                        // const before1hrmessage = {
                        //     "data": { "key": "booking" },
                        //     "notification": {
                        //         "title": "1 hours remaining",
                        //         "body": `Hi ${userData}, only 1 hour remaining of your booking at ${hotelData}`
                        //     }
                        // }
                        // const after1hrmessage = {
                        //     "data": { "key": "booking" },
                        //     "notification": {
                        //         "title": "Review",
                        //         "body": `Hi ${userData}, thanks for choosing to stay at ${hotelData} please give your feedback`
                        //     }
                        // }
                        // //later date for testing
                        // // var currentDate = new Date();
                        // // var laterDate1 = new Date(currentDate.getTime() + (0.105 * 60000));
                        // // var laterDate2 = new Date(currentDate.getTime() + (0.125 * 60000));
                        // // var laterDate3 = new Date(currentDate.getTime() + (0.165 * 60000));
                        // //Booking Successfull Notification
                        // admin.messaging().sendToDevice(registrationToken, bookingSuccessfullMessage, options);
                        // //24 hr before checkin date notification 
                        // var laterDate1 = new Date(new Date(checkinDate).getTime() - (24 * 60 * 60 * 1000));
                        // var job1 = schedule.scheduleJob(`${notificationId}1`, laterDate1, () => {
                        //     admin.messaging().sendToDevice(registrationToken, before24hrsmessage);
                        // });
                        // //1 hr before checkin date notification 
                        // var laterDate2 = new Date(new Date(checkinDate).getTime() - (1 * 60 * 60 * 1000));
                        // var job2 = schedule.scheduleJob(`${notificationId}2`, laterDate2, () => {
                        //     admin.messaging().sendToDevice(registrationToken, before1hrmessage);
                        // });
                        // //1 hr after check out date notification for review
                        // var laterDate3 = new Date(new Date(checkoutDate).getTime() + (1 * 60 * 60 * 1000));
                        // var job3 = schedule.scheduleJob(`${notificationId}3`, laterDate3, () => {
                        //     admin.messaging().sendToDevice(registrationToken, after1hrmessage);
                        // });
                        res.status(statuscode_1.StatusCode.Sucess).send("done");
                        res.end();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        res.status(statuscode_1.StatusCode.Bad_Request).send("fail");
                        res.end();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return WebhookDomain;
}());
exports.WebhookDomain = WebhookDomain;
