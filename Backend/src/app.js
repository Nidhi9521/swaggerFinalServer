"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var admin = require("firebase-admin");
var travelproject22_6b9d4_firebase_adminsdk_2wiay_c9c1876710_json_1 = require("./travelproject22-6b9d4-firebase-adminsdk-2wiay-c9c1876710.json");
var logger_1 = require("./middlewear/logger");
var swagger_ui_express_1 = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
var app = (0, express_1)();
var connection = mongoose_1.connect('mongodb+srv://akash:akash@cluster0.4gzjhma.mongodb.net/mmt');
dotenv.config();
var port = process.env.PORT;
app.use(express_1.json());
app.use(logger_1.LoggerMiddleware);
// ROUTER
var hotel_controller_1 = require("./controller/hotel_controller");
var tour_controller_1 = require("./controller/tour_controller");
var city_controller_1 = require("./controller/city_controller");
var room_controller_1 = require("./controller/room_controller");
var user_controller_1 = require("./controller/user_controller");
var review_controller_1 = require("./controller/review_controller");
var booking_controller_1 = require("./controller/booking_controller");
var bookmark_controller_1 = require("./controller/bookmark_controller");
var payment_controller_1 = require("./controller/payment_controller");
var coupon_controller_1 = require("./controller/coupon_controller");
var webhook_controller_1 = require("./controller/webhook_controller");
app.use('/webhook', webhook_controller_1.router);
// FIREBASE INTITIALIZE
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(travelproject22_6b9d4_firebase_adminsdk_2wiay_c9c1876710_json_1)))
});
app.use("/swagger", swagger_ui_express_1.serve, swagger_ui_express_1.setup(swaggerDocument));
// TOKEN VERIFICATION CALL
// app.use(verifyToken, checkRequest);
// ROOT LEVEL
app.get('/', function (req, res) {
    res.send('MMT Backend development');
    res.end();
});
// USE
app.use('/hotel', hotel_controller_1.router);
app.use('/room', room_controller_1.router);
app.use('/tour', tour_controller_1.router);
app.use('/city', city_controller_1.router);
app.use('/user', user_controller_1.router);
app.use('/review', review_controller_1.router);
app.use('/booking', booking_controller_1.router);
app.use('/bookmark', bookmark_controller_1.router);
app.use('/payment', payment_controller_1.router);
app.use('/coupon', coupon_controller_1.router);
// LISTEN
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at ".concat(port));
});
