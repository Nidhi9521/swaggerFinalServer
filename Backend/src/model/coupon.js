"use strict";
exports.__esModule = true;
exports.couponmodel = void 0;
var mongoose_1 = require("mongoose");
var CouponSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    title: { type: String },
    description: { type: String },
    couponImgUrl: { type: String, required: true },
    discount: { type: Number, required: true },
    minValue: { type: Number, required: true },
    maxOrderValue: { type: Number },
    noOfUser: { type: Number },
    eligibleFor: { type: String, "enum": ['NEW', 'EXISTING', 'ALL'], "default": 'ALL' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});
var couponmodel = mongoose_1["default"].model('coupon', CouponSchema);
exports.couponmodel = couponmodel;
