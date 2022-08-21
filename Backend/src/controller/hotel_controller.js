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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
exports.router = void 0;
var hotel_domain_1 = require("../domain/hotel_domain");
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
var HotelController = /** @class */ (function () {
    function HotelController() {
    }
    HotelController.getHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getAllHotel(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // get hotel by search
    HotelController.getHotelBySearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getHotelBySearch(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //hotel image based on request limit
    HotelController.getHotelImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getHotelImage(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //hotel image based on request limit
    HotelController.getHotelPerticular = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getParticularHotel(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //hotel list and filter hotel list api
    HotelController.getHotelFilterList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getHotelFilterList(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.addHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.addHotel(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.addHotelImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.addhotelImage(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.getHotelDataupdate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.getHotelDataForUpdate(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.deleteHotel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.deleteHotel(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.adddeluxeroomimage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.addDeluxRoomImage(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.addsuperdeluxeroomimage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.addSuperDeluxRoomImage(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.addsemideluxeroomimage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.addSemiDeluxRoomImage(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotelController.updatehoteldata = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hoteldomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hoteldomain = new hotel_domain_1.HotelDomain();
                        return [4 /*yield*/, hoteldomain.updateHotel(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return HotelController;
}());
router.get('/', HotelController.getHotel);
//get hotel image route
router.get('/image/:imagelimit', HotelController.getHotelImage);
router.get('/:hotelsearch', HotelController.getHotelBySearch);
router.get('/gethotel/getsinglehotel/:hotel_id', HotelController.getHotelPerticular);
router.get('/gethotellist/gethotelfilterlist', HotelController.getHotelFilterList);
router.post('/addhotel', HotelController.addHotel);
router.post('/addhotelimage', HotelController.addHotelImage);
router["delete"]('/deleteHotel/:hoteId', HotelController.deleteHotel);
router.post('/adddeluxeroomimage', HotelController.adddeluxeroomimage);
router.post('/addsuperdeluxeroomimage', HotelController.addsuperdeluxeroomimage);
router.post('/addsemideluxeroomimage', HotelController.addsemideluxeroomimage);
router.put('/updatehotel', HotelController.updatehoteldata);
