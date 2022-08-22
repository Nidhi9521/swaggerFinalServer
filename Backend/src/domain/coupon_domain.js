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
exports.CouponDomain = void 0;
var statuscode_1 = require("../statuscode");
var coupon_1 = require("../model/coupon");
var booking_1 = require("../model/booking");
var CouponDomain = /** @class */ (function () {
    function CouponDomain() {
    }
    CouponDomain.prototype.getAllCoupon = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var today, couponData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        today = new Date();
                        return [4 /*yield*/, coupon_1.couponmodel.find({ $and: [{ "startDate": { $lte: today } }, { "endDate": { $gte: today } }] })];
                    case 1:
                        couponData = _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send(couponData);
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CouponDomain.prototype.getCouponId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var today, couponData, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        today = new Date();
                        return [4 /*yield*/, coupon_1.couponmodel.find({ $and: [{ "_id": req.params.id }, { "startDate": { $lte: today } }, { "endDate": { $gte: today } }] })];
                    case 1:
                        couponData = _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send(couponData);
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_2.message);
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CouponDomain.prototype.getCoupon = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var today, q, price, today, userEligibiltiy, reqData, uId, bookingData, couponData, couponData, couponD, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        today = new Date();
                        q = req.query;
                        if (!(((_a = q.price) === null || _a === void 0 ? void 0 : _a.length) != null && ((_b = q.code) === null || _b === void 0 ? void 0 : _b.length) != null)) return [3 /*break*/, 9];
                        price = Number(q.price);
                        today = new Date();
                        if (!(req.headers['data'] != null)) return [3 /*break*/, 2];
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        uId = reqData.uid;
                        return [4 /*yield*/, booking_1.bookingmodel.find({ user_id: uId })];
                    case 1:
                        bookingData = _c.sent();
                        if (bookingData.length != 0) {
                            userEligibiltiy = "EXISTING";
                        }
                        else {
                            userEligibiltiy = "NEW";
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        userEligibiltiy = "ALL";
                        _c.label = 3;
                    case 3: return [4 /*yield*/, coupon_1.couponmodel.find({
                            $and: [{ "code": q.code }, { "startDate": { $lte: today } }, { "endDate": { $gte: today } }, { "maxOrderValue": { $lte: price } },
                                {
                                    $or: [
                                        { 'eligibleFor': userEligibiltiy },
                                        { 'eligibleFor': 'ALL' }
                                    ]
                                }]
                        })];
                    case 4:
                        couponData = _c.sent();
                        if (!(couponData.length != 0)) return [3 /*break*/, 5];
                        res.status(statuscode_1.StatusCode.Sucess).send(couponData);
                        res.end();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, coupon_1.couponmodel.find({
                            $and: [{ "code": q.code }, { "startDate": { $lte: today } }, { "endDate": { $gte: today } },
                                {
                                    $or: [
                                        { 'eligibleFor': userEligibiltiy },
                                        { 'eligibleFor': 'ALL' }
                                    ]
                                }]
                        })];
                    case 6:
                        couponData = _c.sent();
                        if (!(couponData.length != 0)) return [3 /*break*/, 7];
                        res.status(statuscode_1.StatusCode.Sucess).send('This Booking Amount is LOW!!\nSo you can not apply this coupon..\nBetter Luck Next Time!!');
                        res.end();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, coupon_1.couponmodel.find({
                            $and: [{ "code": q.code }, { "startDate": { $lte: today } }, { "endDate": { $gte: today } }, { "maxOrderValue": { $lte: price } }
                            ]
                        })];
                    case 8:
                        couponD = _c.sent();
                        if (couponD.length != 0) {
                            res.status(statuscode_1.StatusCode.Sucess).send('Oh NO!!\nyou can not apply this coupon..\nBetter Luck Next Time!!');
                            res.end();
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send([]);
                            res.end();
                        }
                        _c.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_3 = _c.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_3.message);
                        res.end();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CouponDomain.prototype.getCouponListMostApplicable = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var count, couponResult, q, price, today, userEligibiltiy, reqData, uId, bookingData, couponData, err_4;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        count = 0;
                        couponResult = [];
                        q = req.query;
                        if (!(((_a = q.price) === null || _a === void 0 ? void 0 : _a.length) != null)) return [3 /*break*/, 6];
                        price = Number(q.price);
                        today = new Date();
                        if (!(req.headers['data'] != null)) return [3 /*break*/, 2];
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        uId = reqData.uid;
                        console.log(uId);
                        return [4 /*yield*/, booking_1.bookingmodel.find({ user_id: uId })];
                    case 1:
                        bookingData = _b.sent();
                        if (bookingData.length != 0) {
                            userEligibiltiy = "EXISTING";
                        }
                        else {
                            userEligibiltiy = "NEW";
                        }
                        console.log(userEligibiltiy);
                        console.log(q.price);
                        return [3 /*break*/, 3];
                    case 2:
                        userEligibiltiy = "ALL";
                        _b.label = 3;
                    case 3: return [4 /*yield*/, coupon_1.couponmodel.find({
                            $and: [
                                { "startDate": { $lte: today } },
                                { "endDate": { $gte: today } },
                                { "maxOrderValue": { $lte: price } },
                                {
                                    $or: [
                                        { 'eligibleFor': userEligibiltiy },
                                        { 'eligibleFor': 'ALL' }
                                    ]
                                }
                            ]
                        }).sort({ discount: -1 })];
                    case 4:
                        couponData = _b.sent();
                        console.log(couponData);
                        return [4 /*yield*/, Promise.all(couponData.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var bookingData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(e._id);
                                            return [4 /*yield*/, booking_1.bookingmodel.find({ coupon_id: e._id })];
                                        case 1:
                                            bookingData = _a.sent();
                                            if (bookingData.length == 0) {
                                                couponResult.push(e);
                                            }
                                            if (bookingData.length != 0) {
                                                count = 0;
                                                console.log(bookingData.length);
                                                bookingData.forEach(function (c) {
                                                    if (c.booked_date.getMonth() == today.getMonth()) {
                                                        count++;
                                                    }
                                                });
                                                if (count < e.noOfUser) {
                                                    couponResult.push(e);
                                                }
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _b.sent();
                        couponResult.sort(function (a, b) {
                            return b.discount - a.discount;
                        });
                        console.log(couponResult);
                        res.status(statuscode_1.StatusCode.Sucess).send(couponResult);
                        res.end();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_4 = _b.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_4.message);
                        res.end();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return CouponDomain;
}());
exports.CouponDomain = CouponDomain;
