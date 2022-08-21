"use strict";
exports.__esModule = true;
exports.devicemodel = void 0;
var mongoose_1 = require("mongoose");
var deviceSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    device_id: { type: String, required: true, unique: true },
    useruid: { type: String, required: true },
    fcmtoken: { type: String, required: true },
    devicetype: { type: String, required: true }
});
var devicemodel = mongoose_1["default"].model('devices', deviceSchema);
exports.devicemodel = devicemodel;
