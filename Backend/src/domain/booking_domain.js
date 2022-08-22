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
exports.BookingDomain = void 0;
var booking_1 = require("../model/booking");
var statuscode_1 = require("../statuscode");
var hotel_1 = require("../model/hotel");
var image_1 = require("../model/image");
var coupon_1 = require("../model/coupon");
var users_1 = require("../model/users");
var BookingDomain = /** @class */ (function () {
    function BookingDomain() {
    }
    BookingDomain.prototype.addBooking = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nextID, noOfRoom, bookIngData, sum, rommIdFromReq, getHotelRoom, roomPrice, getHotelRoomPrice, totalPrize, noOfNight, roomGstPrice, roomDiscountPrice, roomTotalPrize, bookedData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, booking_1.bookingmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 1:
                        nextID = _a.sent();
                        noOfRoom = req.body.room_id.length;
                        bookIngData = {
                            _id: (nextID === null || nextID === void 0 ? void 0 : nextID._id) == undefined ? 1 : Number(nextID === null || nextID === void 0 ? void 0 : nextID.id) + 1,
                            user_id: "qeTBCkvbSjRgzYTYEOdPkhynaY33",
                            hotel_id: req.body.hotel_id,
                            no_of_room: noOfRoom,
                            room_id: req.body.room_id,
                            checkin_date: new Date(req.body.checkin_date),
                            checkout_date: new Date(req.body.checkout_date),
                            price: {
                                number_of_nights: req.body.price.number_of_nights,
                                room_price: req.body.price.room_price,
                                gst: req.body.price.gst,
                                discount: req.body.price.discount,
                                total_price: req.body.price.total_price
                            }
                        };
                        sum = 0;
                        rommIdFromReq = (req.body.room_id);
                        console.log(rommIdFromReq);
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: req.body.hotel_id })];
                    case 2:
                        getHotelRoom = _a.sent();
                        roomPrice = [];
                        getHotelRoom.forEach(function (e) {
                            e.room.forEach(function (d) {
                                if (rommIdFromReq.includes(d.room_id)) {
                                    roomPrice.push(d.price);
                                    sum = sum + d.price;
                                }
                            });
                        });
                        getHotelRoomPrice = sum;
                        console.log(getHotelRoom);
                        console.log('price ' + getHotelRoomPrice);
                        totalPrize = (req.body.price.total_price);
                        noOfNight = (req.body.price.number_of_nights);
                        roomGstPrice = ((18 / 100) * (getHotelRoomPrice * noOfNight));
                        roomDiscountPrice = ((getHotelRoomPrice * noOfNight) + roomGstPrice) * 0.05;
                        console.log("gst ".concat(roomGstPrice));
                        console.log("discount ".concat(roomDiscountPrice));
                        roomTotalPrize = ((getHotelRoomPrice * noOfNight) - roomDiscountPrice + roomGstPrice);
                        console.log('price ' + roomTotalPrize);
                        console.log('total ' + totalPrize);
                        if (!(roomTotalPrize == totalPrize)) return [3 /*break*/, 4];
                        bookedData = new booking_1.bookingmodel(bookIngData);
                        console.log(bookedData);
                        return [4 /*yield*/, bookedData.save()];
                    case 3:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send("Booking Success");
                        res.end();
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(statuscode_1.StatusCode.Not_Acceptable).send("Error in calculation");
                        _a.label = 5;
                    case 5:
                        res.end();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        res.end();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.roomBookAvailableCheck = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var q, hotelId, cIn, cOut, noofroom, bookedId_1, unAvailableRoomDupId_1, unAvailableRoomId_1, roomDetailList_1, hotelName, hotelMattress, hotelMattressPrize, resData, unAvailableBooking, semiDeluxData, superDeluxData, deluxData, hRoom, deluxImage, superDeluxImage, semideluxImage, newDeluxIDList_1, newsemiDeluxIDList_1, newSuperDeluxIDList_1, resultData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        q = req.query;
                        hotelId = q.hotel_id;
                        cIn = new Date(q.cin);
                        cOut = new Date(q.cout);
                        noofroom = q.no_of_room;
                        bookedId_1 = [];
                        unAvailableRoomDupId_1 = [];
                        unAvailableRoomId_1 = [];
                        roomDetailList_1 = [];
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ _id: parseInt(hotelId) }).select("mattressPrice")];
                    case 1:
                        hotelMattress = _b.sent();
                        hotelMattressPrize = (_a = hotelMattress === null || hotelMattress === void 0 ? void 0 : hotelMattress.mattressPrice) !== null && _a !== void 0 ? _a : 0;
                        return [4 /*yield*/, booking_1.bookingmodel.find({
                                $and: [{ hotel_id: hotelId },
                                    {
                                        $or: [
                                            { $and: [{ "checkin_date": { $lte: cIn } }, { "checkout_date": { $lte: cIn } }] },
                                            { $and: [{ "checkin_date": { $gte: cOut } }, { "checkout_date": { $gte: cOut } }] }
                                        ]
                                    }
                                ]
                            }, {
                                "_id": 1,
                                "hotel_id": 1,
                                "checkin_date": 1,
                                "checkout_date": 1,
                                "room_id": 1
                            })];
                    case 2:
                        resData = _b.sent();
                        if (!(resData != null)) return [3 /*break*/, 10];
                        //booked ID from resData
                        resData.forEach(function (e) {
                            bookedId_1.push(e._id);
                        });
                        return [4 /*yield*/, booking_1.bookingmodel.find({ $and: [{ hotel_id: hotelId }, { _id: { $nin: bookedId_1 } }] }, {
                                "_id": 1,
                                "hotel_id": 1,
                                "room_id": 1
                            })
                            //console.log("this is unavilablebooking " + unAvailableBooking);
                        ];
                    case 3:
                        unAvailableBooking = _b.sent();
                        if (!(unAvailableBooking != null)) return [3 /*break*/, 8];
                        //Available roomId 
                        unAvailableBooking.forEach(function (e) {
                            e.room_id.forEach(function (d) {
                                unAvailableRoomDupId_1.push(d);
                            });
                        });
                        //Duplication Remove in roomId
                        unAvailableRoomDupId_1.forEach(function (item) {
                            if (!unAvailableRoomId_1.includes(item)) {
                                unAvailableRoomId_1.push(item);
                            }
                        });
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: hotelId })];
                    case 4:
                        hRoom = _b.sent();
                        hRoom.forEach(function (e) {
                            hotelName = e.hotel_name;
                            e.room.forEach(function (c) {
                                if (!unAvailableRoomId_1.includes(c.room_id)) {
                                    roomDetailList_1.push(c);
                                }
                                if (c.room_type == "Deluxe" && deluxData == null) {
                                    deluxData = (JSON.parse(JSON.stringify(c)));
                                }
                                if (c.room_type == "Semi-Deluxe" && semiDeluxData == null) {
                                    semiDeluxData = (JSON.parse(JSON.stringify(c)));
                                }
                                if (c.room_type == "Super-Deluxe" && superDeluxData == null) {
                                    superDeluxData = (JSON.parse(JSON.stringify(c)));
                                }
                            });
                        });
                        return [4 /*yield*/, image_1.imagemodel.find({ $and: [{ room_id: deluxData.room_id }, { hotel_id: hotelId }] })];
                    case 5:
                        deluxImage = _b.sent();
                        return [4 /*yield*/, image_1.imagemodel.find({ $and: [{ room_id: semiDeluxData.room_id }, { hotel_id: hotelId }] })];
                    case 6:
                        superDeluxImage = _b.sent();
                        return [4 /*yield*/, image_1.imagemodel.find({ $and: [{ room_id: semiDeluxData.room_id }, { hotel_id: hotelId }] })];
                    case 7:
                        semideluxImage = _b.sent();
                        deluxData.image = deluxImage;
                        superDeluxData.image = superDeluxImage;
                        semiDeluxData.image = semideluxImage;
                        newDeluxIDList_1 = [];
                        newsemiDeluxIDList_1 = [];
                        newSuperDeluxIDList_1 = [];
                        roomDetailList_1.forEach(function (a) {
                            if (a.room_type == "Deluxe") {
                                newDeluxIDList_1.push(a.room_id);
                            }
                            else if (a.room_type == "Semi-Deluxe") {
                                newsemiDeluxIDList_1.push(a.room_id);
                            }
                            else if (a.room_type == "Super-Deluxe") {
                                newSuperDeluxIDList_1.push(a.room_id);
                            }
                        });
                        resultData = {
                            "hotel_id": hotelId,
                            "hotel_name": hotelName,
                            "hotelMattressPrize": hotelMattressPrize,
                            "deluxe_room_id": newDeluxIDList_1,
                            "deluxe": deluxData,
                            "semideluxe_room_id": newsemiDeluxIDList_1,
                            "semideluxe": semiDeluxData,
                            "superdeluxe_room_id": newSuperDeluxIDList_1,
                            "supedeluxe": superDeluxData
                        };
                        res.status(statuscode_1.StatusCode.Sucess).send(resultData);
                        return [3 /*break*/, 9];
                    case 8:
                        res.status(statuscode_1.StatusCode.Sucess).send({});
                        res.end();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        res.status(statuscode_1.StatusCode.Sucess).send({});
                        res.end();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_1 = _b.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(error_1.message);
                        res.end();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.userBookingHistory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, bookingData, hotelIdList, bookingHistoryData, hotelData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('check');
                        uid = "qeTBCkvbSjRgzYTYEOdPkhynaY33";
                        return [4 /*yield*/, booking_1.bookingmodel.find({ "user_id": uid })];
                    case 1:
                        bookingData = _a.sent();
                        hotelIdList = [];
                        bookingHistoryData = [];
                        if (!(bookingData != null)) return [3 /*break*/, 3];
                        bookingData.forEach(function (e) {
                            hotelIdList.push(e.hotel_id);
                        });
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                {
                                    $match: {
                                        _id: { $in: hotelIdList }
                                    }
                                },
                                {
                                    $lookup: {
                                        from: "images",
                                        localField: "_id",
                                        foreignField: "hotel_id",
                                        pipeline: [
                                            { $match: { room_id: null } }
                                        ],
                                        as: "images"
                                    }
                                },
                                {
                                    "$project": {
                                        "hotel_id": "$_id",
                                        "hotel_name": "$hotel_name",
                                        "address": "$address",
                                        'images': "$images"
                                    }
                                },
                            ])];
                    case 2:
                        hotelData = _a.sent();
                        bookingData.forEach(function (e) {
                            hotelData.forEach(function (d) {
                                var _a, _b, _c, _d, _e;
                                if (e.hotel_id == d._id) {
                                    bookingHistoryData.push({
                                        "hotel_id": d._id,
                                        "hotel_name": d.hotel_name,
                                        "address": d.address,
                                        'images': d.images,
                                        "price": (_a = e.price) === null || _a === void 0 ? void 0 : _a.total_price,
                                        "no_of_room": e.no_of_room,
                                        "number_of_nights": (_b = e.price) === null || _b === void 0 ? void 0 : _b.number_of_nights,
                                        "room_price": (_c = e.price) === null || _c === void 0 ? void 0 : _c.room_price,
                                        "discount": (_d = e.price) === null || _d === void 0 ? void 0 : _d.discount,
                                        "gst": (_e = e.price) === null || _e === void 0 ? void 0 : _e.gst,
                                        "booked_date": e.booked_date,
                                        "checking_date": e.checkin_date,
                                        "checkout_date": e.checkout_date
                                    });
                                }
                            });
                        });
                        console.log(bookingHistoryData);
                        res.status(statuscode_1.StatusCode.Sucess).send(bookingHistoryData);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(statuscode_1.StatusCode.Sucess).send([]);
                        res.end();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(e_1.message);
                        res.end();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.getRoomPrize = function (req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var query, roomid, hotelid, adults, noOfPersonforRoom, countOfMattress, getHotelRoom, hotelId, hotelName, address, rating, roomPrice, sum, hotelMattress, hotelMattressPrize, totalMattressPrize, checkInDate, checkOutDate, diff, diffDays, getHotelRoomPrice, totalHotelRoomPrize, roomPrizwWithDays, gstPercentage, discountPercentage, roomPriceWithGst, resCoupon, discountPrice, totalRoomPrice, roomPriceData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        query = req.query;
                        roomid = query.roomid.split(",").map(Number);
                        hotelid = query.hotelid;
                        adults = query.adults;
                        console.log("roomid", roomid.length);
                        noOfPersonforRoom = ((roomid.length) * 2);
                        countOfMattress = ((adults - noOfPersonforRoom) < 0) ? 0 : (adults - noOfPersonforRoom);
                        console.log("countOfMattress", countOfMattress);
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: hotelid })];
                    case 1:
                        getHotelRoom = _d.sent();
                        hotelId = parseInt(getHotelRoom[0]._id.toString());
                        hotelName = getHotelRoom[0].hotel_name.toString();
                        address = (_a = getHotelRoom[0].address) === null || _a === void 0 ? void 0 : _a.address_line;
                        rating = parseInt(getHotelRoom[0].rating.toString());
                        roomPrice = [];
                        sum = 0;
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ _id: hotelid }).select("mattressPrice")];
                    case 2:
                        hotelMattress = _d.sent();
                        console.log(hotelMattress.mattressPrice);
                        hotelMattressPrize = (_b = hotelMattress === null || hotelMattress === void 0 ? void 0 : hotelMattress.mattressPrice) !== null && _b !== void 0 ? _b : 0;
                        getHotelRoom.forEach(function (e) {
                            e.room.forEach(function (d) {
                                if (roomid.includes(d.room_id)) {
                                    roomPrice.push(d.price);
                                    sum = sum + d.price;
                                }
                            });
                        });
                        console.log(countOfMattress);
                        totalMattressPrize = hotelMattressPrize * countOfMattress;
                        console.log(totalMattressPrize);
                        checkInDate = new Date(query.cin);
                        checkOutDate = new Date(query.cout);
                        diff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
                        diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                        getHotelRoomPrice = sum;
                        totalHotelRoomPrize = getHotelRoomPrice + totalMattressPrize;
                        roomPrizwWithDays = totalHotelRoomPrize * diffDays;
                        gstPercentage = 18;
                        roomPriceWithGst = (roomPrizwWithDays * (gstPercentage / 100));
                        if (!(query.coupon_id != 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, coupon_1.couponmodel.find({ "_id": query.coupon_id })];
                    case 3:
                        resCoupon = _d.sent();
                        if (resCoupon) {
                            discountPercentage = Number((_c = resCoupon[0]) === null || _c === void 0 ? void 0 : _c.discount);
                            discountPrice = (roomPrizwWithDays + roomPriceWithGst) * (discountPercentage / 100);
                            if (discountPrice > resCoupon[0].minValue) {
                                discountPrice = resCoupon[0].minValue;
                            }
                        }
                        else {
                            discountPercentage = 0;
                            discountPrice = 0;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        discountPercentage = 0;
                        discountPrice = 0;
                        _d.label = 5;
                    case 5:
                        totalRoomPrice = (roomPrizwWithDays + roomPriceWithGst - discountPrice);
                        roomPriceData = {
                            hotelid: hotelId,
                            hotelName: hotelName,
                            address: address,
                            rating: rating,
                            checkInDate: query.cin,
                            checkOutDate: query.cout,
                            roomId: roomid,
                            roomPrice: Math.floor(getHotelRoomPrice),
                            noOfmatress: countOfMattress,
                            matressPrize: Math.floor(totalMattressPrize),
                            noOfDays: diffDays,
                            subTotal: Math.floor(roomPrizwWithDays),
                            gstPercentage: gstPercentage,
                            discountPercentage: discountPercentage,
                            gst: Math.floor(roomPriceWithGst),
                            offer: Math.floor(discountPrice),
                            total: Math.floor(totalRoomPrice)
                        };
                        console.log(roomPriceData);
                        res.status(statuscode_1.StatusCode.Sucess).send(roomPriceData);
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.bookingFreeze = function (req, res, cIn, cOut, roomId, hotelId, price, orderId, coupon_id) {
        return __awaiter(this, void 0, void 0, function () {
            var reqData, cin, cout, nextID, diff, diffDays, bookIngData, bookedData, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(roomId.length != 0)) return [3 /*break*/, 4];
                        cin = new Date(cIn);
                        cout = new Date(cOut);
                        return [4 /*yield*/, booking_1.bookingmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 2:
                        nextID = _a.sent();
                        diff = Math.abs(cout.getTime() - cin.getTime());
                        diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                        bookIngData = {
                            _id: (nextID === null || nextID === void 0 ? void 0 : nextID._id) == undefined ? 1 : Number(nextID === null || nextID === void 0 ? void 0 : nextID.id) + 1,
                            // user_id: 'W456HNYRX8a4redJXU9JYxYZm0r1',
                            user_id: reqData.uid,
                            hotel_id: hotelId,
                            no_of_room: roomId.length,
                            room_id: roomId,
                            checkin_date: new Date(cin),
                            checkout_date: new Date(cout),
                            price: {
                                number_of_nights: diffDays,
                                room_price: price.room_price,
                                discount: price.discount,
                                gst: price.gst,
                                total_price: price.total_price
                            },
                            coupon_id: coupon_id,
                            status: "pending",
                            paymentId: null,
                            orderId: orderId
                        };
                        bookedData = new booking_1.bookingmodel(bookIngData);
                        console.log(bookedData);
                        return [4 /*yield*/, bookedData.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, (nextID === null || nextID === void 0 ? void 0 : nextID._id) == undefined ? 1 : Number(nextID === null || nextID === void 0 ? void 0 : nextID.id) + 1];
                    case 4: return [2 /*return*/, 0];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_2.message);
                        res.end();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.bookingFreezFail = function (bookingId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('timer');
                        return [4 /*yield*/, booking_1.bookingmodel.deleteOne({ $and: [{ _id: bookingId }, { status: "pending" }] })];
                    case 1:
                        _a.sent();
                        console.log('deleted');
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.getAllBookingAdmin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, q, pageSize, page, hotelName, todayDate, checkIndata, newCheckIndate, hotelid, allHotelId, allHotelIdarr, hotelIdtoSearch, hotelId, hotelIdFind, date2, newCheckOutdata, userName, userId, userIdarr, allUserIdarr, allUserid, userIdsearch, allBookingData, allBookingData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 10];
                        q = req.query;
                        pageSize = req.query.pagesize;
                        page = req.query.page;
                        hotelName = req.query.hotelname;
                        todayDate = new Date();
                        checkIndata = ((req.query.date1) == "" ? todayDate : (req.query.date1));
                        newCheckIndate = new Date(checkIndata);
                        console.log(newCheckIndate);
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ hotel_name: { $regex: hotelName + '.*', $options: 'i' } })];
                    case 2:
                        hotelid = _a.sent();
                        return [4 /*yield*/, hotel_1.hotelmodel.find().select("_id")];
                    case 3:
                        allHotelId = _a.sent();
                        allHotelIdarr = [];
                        allHotelId.forEach(function (e) {
                            allHotelIdarr.push(e._id);
                        });
                        hotelIdtoSearch = [];
                        hotelId = hotelid === null || hotelid === void 0 ? void 0 : hotelid._id;
                        hotelIdtoSearch.push(hotelId);
                        hotelIdFind = (hotelName == "" ? allHotelIdarr : hotelIdtoSearch);
                        date2 = req.query.date2;
                        newCheckOutdata = new Date(date2);
                        userName = req.query.username;
                        return [4 /*yield*/, users_1.Usermodel.findOne({ user_name: { $regex: userName + '.*', $options: 'i' } })];
                    case 4:
                        userId = _a.sent();
                        userIdarr = [];
                        allUserIdarr = [];
                        userIdarr.push(userId === null || userId === void 0 ? void 0 : userId._id);
                        return [4 /*yield*/, users_1.Usermodel.find().select("_id")];
                    case 5:
                        allUserid = _a.sent();
                        allUserid.forEach(function (e) {
                            allUserIdarr.push(e._id);
                        });
                        userIdsearch = ((req.query.username) == "" ? allUserIdarr : userIdarr);
                        if (!date2) return [3 /*break*/, 7];
                        return [4 /*yield*/, booking_1.bookingmodel.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            { "checkin_date": { $gte: newCheckIndate } },
                                            { "checkin_date": { $lte: newCheckOutdata } },
                                            { "hotel_id": { $in: hotelIdFind } },
                                            { "user_id": { $in: userIdsearch } }
                                        ]
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        localField: 'user_id',
                                        foreignField: '_id',
                                        pipeline: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    user_name: 1,
                                                    user_email: 1,
                                                    user_image: 1
                                                }
                                            }
                                        ],
                                        as: 'userdata'
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'hotels',
                                        localField: 'hotel_id',
                                        foreignField: '_id',
                                        pipeline: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    hotel_name: 1
                                                }
                                            }
                                        ],
                                        as: 'hoteldata'
                                    }
                                },
                            ]).skip((parseInt(pageSize) * parseInt(page))).limit(parseInt(pageSize))];
                    case 6:
                        allBookingData = _a.sent();
                        if (allBookingData) {
                            res.send(allBookingData);
                        }
                        else {
                            res.send([]);
                        }
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, booking_1.bookingmodel.aggregate([
                            {
                                $match: {
                                    $and: [
                                        { "checkin_date": { $gte: newCheckIndate } },
                                        { "hotel_id": { $in: hotelIdFind } },
                                        { "user_id": { $in: userIdsearch } }
                                    ]
                                }
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'user_id',
                                    foreignField: '_id',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 1,
                                                user_name: 1,
                                                user_email: 1,
                                                user_image: 1
                                            }
                                        }
                                    ],
                                    as: 'userdata'
                                }
                            },
                            {
                                $lookup: {
                                    from: 'hotels',
                                    localField: 'hotel_id',
                                    foreignField: '_id',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 1,
                                                hotel_name: 1
                                            }
                                        }
                                    ],
                                    as: 'hoteldata'
                                }
                            },
                        ]).skip((parseInt(pageSize) * parseInt(page))).limit(parseInt(pageSize))];
                    case 8:
                        allBookingData = _a.sent();
                        if (allBookingData) {
                            res.send(allBookingData);
                        }
                        else {
                            res.send([]);
                        }
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return BookingDomain;
}());
exports.BookingDomain = BookingDomain;
