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
exports.CancelBookingDomain = void 0;
var booking_1 = require("../model/booking");
var statuscode_1 = require("../statuscode");
var admin = require("firebase-admin");
var node_schedule_1 = require("node-schedule");
var CancelBookingDomain = /** @class */ (function () {
    function CancelBookingDomain() {
    }
    CancelBookingDomain.prototype.cancelBooking = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, bookingId, checkBookingData, bookingData, cancelStatus, temp, hoursDifference, paymentPrice, refundAmmount, notification_options, registrationToken, options, message, job1, job2, job3, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        currentDate = new Date().toISOString();
                        bookingId = Number(req.params.bookingid);
                        return [4 /*yield*/, booking_1.bookingmodel.findById(bookingId)];
                    case 1:
                        checkBookingData = _a.sent();
                        if (!(checkBookingData == null)) return [3 /*break*/, 2];
                        res.status(statuscode_1.StatusCode.Bad_Request).send("invalid booking id");
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, booking_1.bookingmodel.findOne({ $and: [{ _id: bookingId }, { checkin_date: { $gt: currentDate } }] })];
                    case 3:
                        bookingData = _a.sent();
                        if (!(bookingData == null)) return [3 /*break*/, 4];
                        res.status(statuscode_1.StatusCode.Gone).send("can't cancel hotel bacause your check in date is started...");
                        return [3 /*break*/, 7];
                    case 4:
                        cancelStatus = {
                            status: "cancel"
                        };
                        return [4 /*yield*/, booking_1.bookingmodel.findByIdAndUpdate(bookingId, cancelStatus)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, booking_1.bookingmodel.aggregate([
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "user_id",
                                        foreignField: "_id",
                                        as: "user_data"
                                    }
                                }, {
                                    $lookup: {
                                        from: "hotels",
                                        localField: "hotel_id",
                                        foreignField: "_id",
                                        as: "hotel_data"
                                    }
                                },
                                {
                                    $set: {
                                        hoursDiff: {
                                            $dateDiff: {
                                                startDate: { $toDate: currentDate },
                                                endDate: { $toDate: bookingData === null || bookingData === void 0 ? void 0 : bookingData.checkin_date },
                                                unit: "hour"
                                            }
                                        }
                                    }
                                },
                                { $match: { hoursDiff: { $gt: 0 }, "_id": bookingId } },
                            ])];
                    case 6:
                        temp = _a.sent();
                        hoursDifference = Number(temp[0].hoursDiff);
                        paymentPrice = Number(temp[0].price.total_price);
                        if (hoursDifference >= 72) {
                            refundAmmount = paymentPrice;
                            console.log("free");
                        }
                        else if (hoursDifference >= 48) {
                            console.log("20% charge");
                            console.log("80% will refund");
                            refundAmmount = paymentPrice * 0.8;
                        }
                        else if (hoursDifference >= 24) {
                            console.log("50% charge");
                            console.log("50% will refund");
                            refundAmmount = paymentPrice * 0.5;
                        }
                        else {
                            console.log("100% charge");
                            console.log("0% will refund");
                            refundAmmount = paymentPrice * 0;
                        }
                        notification_options = {
                            priority: "high",
                            timeToLive: 60 * 60 * 24
                        };
                        registrationToken = req.params.deviceid;
                        options = notification_options;
                        message = {
                            "data": { "key": "booking" },
                            "notification": {
                                "title": "Booking Cancelled successfully",
                                "body": "Dear ".concat(temp[0].user_data[0].user_name, " ,refund ammount is \u20B9").concat(refundAmmount, " for your booking of ").concat(temp[0].hotel_data[0].hotel_name, " as per our booking cancellation policy")
                            }
                        };
                        // Booking Cancelled Notification
                        admin.messaging().sendToDevice(registrationToken, message, options);
                        job1 = node_schedule_1["default"].scheduledJobs["".concat(bookingId, "1")];
                        job2 = node_schedule_1["default"].scheduledJobs["".concat(bookingId, "2")];
                        job3 = node_schedule_1["default"].scheduledJobs["".concat(bookingId, "3")];
                        if (job1 != undefined) {
                            job1.cancel();
                        }
                        if (job2 != undefined) {
                            job2.cancel();
                        }
                        if (job3 != undefined) {
                            job3.cancel();
                        }
                        res.status(statuscode_1.StatusCode.Sucess).send("booking cancelled");
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return CancelBookingDomain;
}());
exports.CancelBookingDomain = CancelBookingDomain;
