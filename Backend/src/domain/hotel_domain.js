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
exports.HotelDomain = void 0;
var hotel_1 = require("../model/hotel");
var city_1 = require("../model/city");
var statuscode_1 = require("../statuscode");
var image_1 = require("../model/image");
var availability_domain_1 = require("./availability_domain");
var users_1 = require("../model/users");
var HotelDomain = /** @class */ (function () {
    function HotelDomain() {
    }
    //Get All hotel list
    HotelDomain.prototype.getAllHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, page, hotelSearchParams, city, cityId, hoteBySerch, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = req.query.pagesize;
                        page = req.query.page;
                        hotelSearchParams = req.query.searchdata;
                        return [4 /*yield*/, city_1.citymodel.findOne({ city_name: { $regex: hotelSearchParams + '.*', $options: 'i' } })];
                    case 1:
                        city = _a.sent();
                        cityId = city === null || city === void 0 ? void 0 : city._id;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                {
                                    $match: {
                                        $or: [{ "address.city_id": cityId },
                                            { "address.address_line": { $regex: hotelSearchParams + '.*', $options: 'i' } },
                                            { "address.pincode": { $regex: hotelSearchParams + '.*', $options: 'i' } },
                                            { hotel_name: { $regex: hotelSearchParams + '.*', $options: 'i' } }]
                                    }
                                },
                                { $sort: { _id: 1 } },
                                {
                                    $lookup: {
                                        from: "images",
                                        localField: "_id",
                                        foreignField: "hotel_id",
                                        pipeline: [
                                            { $match: { room_id: null } }
                                        ],
                                        as: "Images"
                                    }
                                },
                                {
                                    "$project": {
                                        "hotel_id": "$_id",
                                        "hotel_name": "$hotel_name",
                                        "rating": "$rating",
                                        "address": "$address",
                                        "price": "$price",
                                        'Images': "$Images"
                                    }
                                },
                            ]).skip((parseInt(pageSize) * parseInt(page))).limit(parseInt(pageSize))];
                    case 3:
                        hoteBySerch = _a.sent();
                        if (hoteBySerch.length == 0) {
                            res.status(statuscode_1.StatusCode.Sucess).send("No Hotel Found");
                            res.end();
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send(hoteBySerch);
                            res.end();
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        res.end();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //get hotel image based on ui send limit of needed image
    HotelDomain.prototype.getHotelImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hotelData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                { $match: { rating: { $gte: 4 } } },
                                { $sample: { size: parseInt(req.params.imagelimit) } },
                                {
                                    $lookup: {
                                        from: "images",
                                        localField: "_id",
                                        foreignField: "hotel_id",
                                        pipeline: [
                                            { $match: { room_id: null } }
                                        ],
                                        as: "Images"
                                    }
                                },
                                {
                                    "$project": {
                                        "hotel_id": "$_id",
                                        "hotel_name": "$hotel_name",
                                        "rating": "$rating",
                                        "address": "$address",
                                        'Images': "$Images"
                                    }
                                },
                            ])];
                    case 1:
                        hotelData = _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send(hotelData);
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(e_1.message);
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get hotel by search [city wise or hotel name wise]
    HotelDomain.prototype.getHotelBySearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hotelSearchParams, city, cityId, hoteBySerch, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hotelSearchParams = req.params.hotelsearch;
                        return [4 /*yield*/, city_1.citymodel.findOne({ city_name: { $regex: hotelSearchParams + '.*', $options: 'i' } })];
                    case 1:
                        city = _a.sent();
                        cityId = city === null || city === void 0 ? void 0 : city._id;
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                {
                                    $match: {
                                        $or: [{ "address.city_id": cityId },
                                            { "address.address_line": { $regex: hotelSearchParams + '.*', $options: 'i' } },
                                            { "address.pincode": { $regex: hotelSearchParams + '.*', $options: 'i' } },
                                            { hotel_name: { $regex: hotelSearchParams + '.*', $options: 'i' } }]
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
                                        as: "Images"
                                    }
                                },
                                {
                                    "$project": {
                                        "hotel_id": "$_id",
                                        "hotel_name": "$hotel_name",
                                        "rating": "$rating",
                                        "address": "$address",
                                        "price": "$price",
                                        'Images': "$Images"
                                    }
                                },
                            ])];
                    case 2:
                        hoteBySerch = _a.sent();
                        if (hoteBySerch.length == 0) {
                            res.status(statuscode_1.StatusCode.Sucess).send([]);
                            res.end();
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send(hoteBySerch);
                            res.end();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_2.message);
                        res.end();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get perticular hotel
    HotelDomain.prototype.getParticularHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bookmark, uId, hotelData, d, responseData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (req.headers['token'] != null) {
                            uId = "qeTBCkvbSjRgzYTYEOdPkhynaY33";
                            // if (reqData.provider != 'anyonums' && reqData.email != null) {
                            //     let dataBook = await bookmarkmodel.find({ $and: [{ hotel_id: req.params.hotel_id }, { user_id: uId }] });
                            //     if (dataBook.length != 0) {
                            //         bookmark = true;
                            //     } else {
                            //         bookmark = false;
                            //     }
                            // } else {
                            //     bookmark = false;
                            // }
                        }
                        else {
                            bookmark = false;
                        }
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                { $match: { "_id": parseInt(req.params.hotel_id) } },
                                {
                                    $lookup: {
                                        from: 'images',
                                        localField: '_id',
                                        foreignField: 'hotel_id',
                                        pipeline: [
                                            { $match: { "room_id": null } }
                                        ],
                                        as: 'images'
                                    }
                                }, {
                                    $project: {
                                        "_id": 1,
                                        "hotel_name": 1,
                                        "rating": 1,
                                        "address": 1,
                                        "description": 1,
                                        "phone_number": 1,
                                        "price": 1,
                                        "features": 1,
                                        'images': 1
                                    }
                                },
                            ])];
                    case 1:
                        hotelData = _a.sent();
                        d = hotelData[0];
                        responseData = {
                            _id: d._id,
                            hotel_name: d.hotel_name,
                            rating: d.rating,
                            address: d.address,
                            description: d.description,
                            price: d.price,
                            features: d.features,
                            phone_number: d.phone_number,
                            images: d.images,
                            isbookmark: bookmark
                        };
                        res.status(statuscode_1.StatusCode.Sucess).send(responseData);
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_3.message);
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.getHotelFilterList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var q, availabilityDomain_1, cIn_1, cOut_1, noOfRoom_1, type, id, hotelIdArray_1, avilHotelId, hotelId, cityBasedSerch, avilHotelId, ratingParams, priceParams, featuresParams, flag, resData, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = req.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        availabilityDomain_1 = new availability_domain_1.AvailabilityDomain();
                        if (!(q.cin.length != 0 && q.cout.length != 0 && q.no_of_room.length != 0 && q.type.length != 0 && q.id.length != 0)) return [3 /*break*/, 9];
                        cIn_1 = new Date(q.cin);
                        cOut_1 = new Date(q.cout);
                        noOfRoom_1 = q.no_of_room;
                        type = q.type;
                        id = q.id;
                        hotelIdArray_1 = [];
                        avilHotelId = [];
                        if (!(type == "hotel")) return [3 /*break*/, 3];
                        return [4 /*yield*/, availabilityDomain_1.checkAvailability(cIn_1, cOut_1, id, noOfRoom_1)];
                    case 2:
                        hotelId = _a.sent();
                        if (hotelId != null) {
                            //if hotel is available
                            avilHotelId.push(hotelId);
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(type == "area")) return [3 /*break*/, 6];
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ 'address.city_id': id })];
                    case 4:
                        cityBasedSerch = _a.sent();
                        return [4 /*yield*/, Promise.all(cityBasedSerch.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var hotelId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            hotelIdArray_1.push(e._id);
                                            return [4 /*yield*/, availabilityDomain_1.checkAvailability(cIn_1, cOut_1, e._id, noOfRoom_1)];
                                        case 1:
                                            hotelId = _a.sent();
                                            if (hotelId != null) {
                                                //if hotel is available
                                                avilHotelId.push(hotelId);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(statuscode_1.StatusCode.Sucess).send('params is not match');
                        res.end();
                        _a.label = 7;
                    case 7:
                        avilHotelId = avilHotelId.map(Number);
                        if (!(avilHotelId != null)) return [3 /*break*/, 9];
                        ratingParams = q.rating.split(",").map(Number);
                        priceParams = q.price.split("-").map(Number);
                        featuresParams = q.features.split(",");
                        flag = false;
                        //price default if params is single  
                        q.price.length == 0 ? (null) : (priceParams.length == 1 ? (priceParams[1] = 100000) : (flag = false));
                        resData = [];
                        return [4 /*yield*/, Promise.all(avilHotelId.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var hotelfilterlist, hotelfilterlist;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(q.rating.length == 0 && q.price.length == 0 && q.features.length == 0)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, hotel_1.hotelmodel.aggregate([{
                                                        $match: { _id: e }
                                                    },
                                                    {
                                                        $lookup: {
                                                            from: "images",
                                                            localField: "_id",
                                                            foreignField: "hotel_id",
                                                            pipeline: [
                                                                { $match: { room_id: null } }
                                                            ],
                                                            as: "Images"
                                                        }
                                                    },
                                                    {
                                                        "$project": {
                                                            "hotel_id": "$_id",
                                                            "hotel_name": "$hotel_name",
                                                            "rating": "$rating",
                                                            "address": "$address",
                                                            "price": "$price",
                                                            'Images': "$Images"
                                                        }
                                                    },
                                                ])];
                                        case 1:
                                            hotelfilterlist = _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, hotel_1.hotelmodel.aggregate([{
                                                    $match: {
                                                        $and: [{ _id: e }, {
                                                                $or: [{ rating: { $in: ratingParams } },
                                                                    { price: { $gte: priceParams[0], $lte: priceParams[1] } },
                                                                    { features: { $in: featuresParams } }
                                                                ]
                                                            }]
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
                                                        as: "Images"
                                                    }
                                                },
                                                {
                                                    "$project": {
                                                        "hotel_id": "$_id",
                                                        "hotel_name": "$hotel_name",
                                                        "rating": "$rating",
                                                        "address": "$address",
                                                        "price": "$price",
                                                        'Images': "$Images"
                                                    }
                                                },
                                            ])];
                                        case 3:
                                            hotelfilterlist = _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            if (hotelfilterlist.length != 0) {
                                                resData.push(hotelfilterlist[0]);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 8:
                        _a.sent();
                        if (resData.length != 0) {
                            res.status(statuscode_1.StatusCode.Sucess).send(resData);
                            res.end();
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send([]);
                            res.end();
                        }
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_4 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_4.message);
                        res.end();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    //add hotel 
    HotelDomain.prototype.addHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, newHotelData, nextID, last, newId, room, noOfDelux, noOfSuperDeluxe, noOfSemiDeluxe, i, deluxRoomDetails, semideluxRoomDetails, superdeluxRoomDetails, data, hoteId, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 8];
                        newHotelData = req.body;
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 2:
                        nextID = _a.sent();
                        return [4 /*yield*/, hotel_1.hotelmodel.find({}).sort({ _id: -1 }).limit(1)];
                    case 3:
                        last = _a.sent();
                        console.log(last[0]._id);
                        newId = last[0]._id;
                        newHotelData._id = newId + 1;
                        room = [];
                        noOfDelux = req.body.noofdeluxe;
                        noOfSuperDeluxe = req.body.noodsuperdeluxe;
                        noOfSemiDeluxe = req.body.noofsemideluxe;
                        console.log(noOfDelux);
                        for (i = 0; i < noOfDelux; i++) {
                            deluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1),
                                "room_type": "Deluxe",
                                "room_size": req.body.deluxesize,
                                "bed_size": req.body.deluxebadsize,
                                "max_capacity": req.body.deluxemaxcapacity,
                                "price": req.body.deluxeprice,
                                "features": req.body.deluxefeatures,
                                "description": req.body.deluxedescription
                            };
                            room.push(deluxRoomDetails);
                        }
                        for (i = 0; i < noOfSemiDeluxe; i++) {
                            semideluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1 + noOfDelux),
                                "room_type": "Semi-Deluxe",
                                "room_size": req.body.semideluxesize,
                                "bed_size": req.body.semideluxebadsize,
                                "max_capacity": req.body.semideluxemaxcapacity,
                                "price": req.body.semideluxeprice,
                                "features": req.body.semideluxefeatures,
                                "description": req.body.semideluxedescription
                            };
                            room.push(semideluxRoomDetails);
                        }
                        for (i = 0; i < noOfSuperDeluxe; i++) {
                            superdeluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1 + noOfSemiDeluxe + noOfDelux),
                                "room_type": "Super-Deluxe",
                                "room_size": req.body.superdeluxesize,
                                "bed_size": req.body.superdeluxebadsize,
                                "max_capacity": req.body.superdeluxemaxcapacity,
                                "price": req.body.superdeluxeprice,
                                "features": req.body.superdeluxefeatures,
                                "description": req.body.superdeluxedescription
                            };
                            room.push(superdeluxRoomDetails);
                        }
                        newHotelData.room = room;
                        data = new hotel_1.hotelmodel(newHotelData);
                        hoteId = {
                            "hotel_id": newHotelData._id,
                            "message ": "Your hotel data sucefully saved"
                        };
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, data.save()];
                    case 5:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send(hoteId);
                        return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_5.message);
                        res.end();
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    //add hotel image
    HotelDomain.prototype.addhotelImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, nextID, hotelId, imagearray, imageData, i, images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 4];
                        return [4 /*yield*/, image_1.imagemodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 2:
                        nextID = _a.sent();
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 3:
                        hotelId = _a.sent();
                        req.body._id = nextID._id + 1;
                        console.log(req.body._id);
                        req.body.hotel_id = hotelId._id;
                        imagearray = req.body.image_url;
                        imageData = [];
                        for (i = 0; i < imagearray.length; i++) {
                            console.log("this i", i);
                            console.log("this is image 1", imagearray[i]);
                            console.log(req.body._id + i);
                            images = {
                                "_id": req.body._id + i,
                                "image_url": imagearray[i],
                                "hotel_id": req.body.hotel_id,
                                "room_id": (req.body.room_id == null) ? null : req.body.room_id,
                                "tour_id": null,
                                "user_id": null
                            };
                            imageData.push(images);
                        }
                        image_1.imagemodel.insertMany(imageData, function (err, result) {
                            if (err)
                                throw err;
                            res.status(statuscode_1.StatusCode.Sucess).send("Image sucessfully added");
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.getHotelDataForUpdate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldata, deluxId, superdeluxId, semideluxId, semiDeluxData, superDeluxData, deluxData, hotelResponseData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.params.hotelid);
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ _id: req.params.hotelid })];
                    case 1:
                        hoteldata = _a.sent();
                        console.log(hoteldata.room.length);
                        deluxId = [];
                        superdeluxId = [];
                        semideluxId = [];
                        hoteldata.room.forEach(function (e) {
                            if (e.room_type == 'Semi-Deluxe') {
                                semideluxId.push(e.room_id);
                            }
                            if (e.room_type == 'Deluxe') {
                                deluxId.push(e.room_id);
                            }
                            if (e.room_type == 'Super-Deluxe') {
                                superdeluxId.push(e.room_id);
                            }
                            if (e.room_type == "Deluxe" && deluxData == null) {
                                deluxData = (JSON.parse(JSON.stringify(e)));
                            }
                            if (e.room_type == "Semi-Deluxe" && semiDeluxData == null) {
                                semiDeluxData = (JSON.parse(JSON.stringify(e)));
                            }
                            if (e.room_type == "Super-Deluxe" && superDeluxData == null) {
                                superDeluxData = (JSON.parse(JSON.stringify(e)));
                            }
                        });
                        console.log("delux", deluxId);
                        console.log("superdelux", superdeluxId);
                        console.log("semidelux", semideluxId);
                        console.log("delux", deluxData);
                        console.log("superdelux", superDeluxData);
                        console.log("semidelux", semiDeluxData);
                        hotelResponseData = {
                            "_id": hoteldata._id,
                            "hotel_name": hoteldata.hotel_name,
                            "address": {
                                "address_line": hoteldata.address.address_line,
                                "city_id": hoteldata.address.city_id,
                                "pincode": hoteldata.address.pincode,
                                "location": {
                                    "latitude": hoteldata.address.location.latitude,
                                    "longitude": hoteldata.address.location.latitude
                                }
                            },
                            "rating": hoteldata.rating,
                            "price": hoteldata.price,
                            "phone_number": hoteldata.phone_number,
                            "no_of_room": hoteldata.no_of_room,
                            "description": hoteldata.description,
                            "features": hoteldata.features,
                            "noofdeluxe": deluxId.length,
                            "deluxesize": deluxData.room_size,
                            "deluxebadsize": deluxData.bed_size,
                            "deluxemaxcapacity": deluxData.max_capacity,
                            "deluxeprice": deluxData.price,
                            "deluxefeatures": deluxData.features,
                            "deluxedescription": deluxData.description,
                            "noofsemideluxe": semideluxId.length,
                            "semideluxesize": semiDeluxData.room_size,
                            "semideluxebadsize": semiDeluxData.bed_size,
                            "semideluxemaxcapacity": semiDeluxData.max_capacity,
                            "semideluxeprice": semiDeluxData.price,
                            "semideluxefeatures": semiDeluxData.features,
                            "semideluxedescription": semiDeluxData.description,
                            "noodsuperdeluxe": superdeluxId.length,
                            "superdeluxesize": superDeluxData.room_size,
                            "superdeluxebadsize": superDeluxData.bed_size,
                            "superdeluxemaxcapacity": superDeluxData.max_capacity,
                            "superdeluxeprice": superDeluxData.price,
                            "superdeluxefeatures": superDeluxData.features,
                            "superdeluxedescription": superDeluxData.description
                        };
                        res.send(hotelResponseData);
                        return [2 /*return*/];
                }
            });
        });
    };
    //delete hotel 
    HotelDomain.prototype.deleteHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, hotelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 3];
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ _id: req.params.hoteId })];
                    case 2:
                        hotelData = _a.sent();
                        if (hotelData) {
                            hotel_1.hotelmodel.deleteOne({ _id: req.params.hoteId }, function (err) {
                                if (!err) {
                                    image_1.imagemodel.deleteMany({ hotel_id: req.params.hoteId }, function (err) {
                                        if (!err) {
                                            res.send("hotel and image Delete sucesffully");
                                            res.end();
                                        }
                                        else {
                                            res.status(statuscode_1.StatusCode.Server_Error).send(err.message);
                                            res.end();
                                        }
                                    });
                                }
                                else {
                                    res.status(statuscode_1.StatusCode.Server_Error).send(err.message);
                                    res.end();
                                }
                            });
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send("Can not find hotel");
                            res.end();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.addRoomImage = function (req, res, roomtype) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, nextID, hotelId, roomId, roomdata, imagearray, imageData, i, j, images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 5];
                        return [4 /*yield*/, image_1.imagemodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 2:
                        nextID = _a.sent();
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 3:
                        hotelId = _a.sent();
                        req.body._id = nextID._id + 1;
                        roomId = [];
                        return [4 /*yield*/, hotel_1.hotelmodel.findOne({ _id: hotelId }).select("room")];
                    case 4:
                        roomdata = _a.sent();
                        roomdata.room.forEach(function (e) {
                            if (e.room_type == roomtype) {
                                roomId.push(e.room_id);
                            }
                        });
                        imagearray = req.body.image_url;
                        imageData = [];
                        for (j = 0; j < roomId.length; j++) {
                            for (i = 0; i < imagearray.length; i++) {
                                images = {
                                    "image_url": imagearray[i],
                                    "hotel_id": req.body.hotel_id,
                                    "room_id": roomId[j],
                                    "tour_id": null,
                                    "user_id": null
                                };
                                imageData.push(images);
                            }
                        }
                        for (i = 0; i < imageData.length; i++) {
                            imageData[i]._id = nextID._id + i + 1;
                        }
                        image_1.imagemodel.insertMany(imageData, function (err, result) {
                            if (err)
                                throw err;
                            res.status(statuscode_1.StatusCode.Sucess).send("Image sucessfully added");
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.addDeluxRoomImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addRoomImage(req, res, "Deluxe")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.addSuperDeluxRoomImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addRoomImage(req, res, "Super-Deluxe")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelDomain.prototype.addSemiDeluxRoomImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addRoomImage(req, res, "Semi-Deluxe")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //update hotel
    HotelDomain.prototype.updateHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, userData, newHotelData, room, noOfDelux, noOfSuperDeluxe, noOfSemiDeluxe, i, deluxRoomDetails, semideluxRoomDetails, superdeluxRoomDetails, data, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = "dwkkf5q7ufOeZCSqo5qMBR1sA1F2";
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        if (!(userData[0].user_type == "admin")) return [3 /*break*/, 6];
                        newHotelData = req.body;
                        room = [];
                        noOfDelux = req.body.noofdeluxe;
                        noOfSuperDeluxe = req.body.noodsuperdeluxe;
                        noOfSemiDeluxe = req.body.noofsemideluxe;
                        for (i = 0; i < noOfDelux; i++) {
                            deluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1),
                                "room_type": "Deluxe",
                                "room_size": req.body.deluxesize,
                                "bed_size": req.body.deluxebadsize,
                                "max_capacity": req.body.deluxemaxcapacity,
                                "price": req.body.deluxeprice,
                                "features": req.body.deluxefeatures,
                                "description": req.body.deluxedescription
                            };
                            room.push(deluxRoomDetails);
                        }
                        for (i = 0; i < noOfSemiDeluxe; i++) {
                            semideluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1 + noOfDelux),
                                "room_type": "Semi-Deluxe",
                                "room_size": req.body.semideluxesize,
                                "bed_size": req.body.semideluxebadsize,
                                "max_capacity": req.body.semideluxemaxcapacity,
                                "price": req.body.semideluxeprice,
                                "features": req.body.semideluxefeatures,
                                "description": req.body.semideluxedescription
                            };
                            room.push(semideluxRoomDetails);
                        }
                        for (i = 0; i < noOfSuperDeluxe; i++) {
                            superdeluxRoomDetails = {
                                "room_id": ((newHotelData._id) * 100) + (i + 1 + noOfSemiDeluxe + noOfDelux),
                                "room_type": "Super-Deluxe",
                                "room_size": req.body.superdeluxesize,
                                "bed_size": req.body.superdeluxebadsize,
                                "max_capacity": req.body.superdeluxemaxcapacity,
                                "price": req.body.superdeluxeprice,
                                "features": req.body.superdeluxefeatures,
                                "description": req.body.superdeluxedescription
                            };
                            room.push(superdeluxRoomDetails);
                        }
                        newHotelData.room = room;
                        console.log(newHotelData);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = req.body;
                        console.log(data);
                        return [4 /*yield*/, hotel_1.hotelmodel.updateOne({ _id: data._id }, data)];
                    case 3:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send('update saved success');
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_6.message);
                        res.end();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.status(statuscode_1.StatusCode.Unauthorized).send("you are not authorize");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return HotelDomain;
}());
exports.HotelDomain = HotelDomain;
