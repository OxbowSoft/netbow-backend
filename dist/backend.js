/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "I:\\dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/init.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config/dependency.ts":
/*!*************************************!*\
  !*** ./server/config/dependency.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var firebase_1 = __webpack_require__(/*! ../database/firebase */ "./server/database/firebase.ts");
var dependency = {
    firebase: new firebase_1["default"]()
};
exports["default"] = dependency;


/***/ }),

/***/ "./server/config/index.ts":
/*!********************************!*\
  !*** ./server/config/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var express = __webpack_require__(/*! express */ "express");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var route_1 = __webpack_require__(/*! ./route */ "./server/config/route.ts");
var App = /** @class */ (function () {
    function App(dependency) {
        this.dependency = dependency;
        this.express = express();
        this.middleware();
        this.mountRoutes();
    }
    App.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.mountRoutes = function () {
        var _this = this;
        var router = express.Router();
        route_1["default"].forEach(function (route) {
            switch (route.method) {
                case 'get':
                    router.get(route.path, function (req, res) { return route.actions(req, res, _this.dependency); });
                case 'post':
                    router.post(route.path, function (req, res) { return route.actions(req, res, _this.dependency); });
                case 'delete':
                    router["delete"](route.path, function (req, res) { return route.actions(req, res, _this.dependency); });
                case 'put':
                    router.put(route.path, function (req, res) { return route.actions(req, res, _this.dependency); });
            }
        });
        this.express.use('/', router);
    };
    return App;
}());
exports["default"] = App;


/***/ }),

/***/ "./server/config/route.ts":
/*!********************************!*\
  !*** ./server/config/route.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var User_1 = __webpack_require__(/*! ../controllers/Users/User */ "./server/controllers/Users/User.ts");
var routes = [
    { method: 'post', path: '/createUser', actions: function (req, res, dependency) {
            new User_1["default"]({ req: req, res: res }, dependency).createUser();
        } },
    { method: 'post', path: '/getUser', actions: function (req, res, dependency) {
            new User_1["default"]({ req: req, res: res }, dependency).getUser();
        } }
];
exports["default"] = routes;


/***/ }),

/***/ "./server/controllers/Users/User.ts":
/*!******************************************!*\
  !*** ./server/controllers/Users/User.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var controllers_1 = __webpack_require__(/*! ../../core/controllers */ "./server/core/controllers.ts");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(server, dependency) {
        return _super.call(this, server, dependency) || this;
    }
    User.prototype.createUser = function () {
        var _this = this;
        var uid = this.server.req.body.uid;
        this.dependency.firebase.createUser(uid)
            .then(function () {
            _this.server.res.send('work');
        });
    };
    User.prototype.getUser = function () {
        var _this = this;
        var uid = this.server.req.body.uid;
        this.dependency.firebase.getUser(uid)
            .then(function (response) {
            var user = {
                actuallyWatch: response._fieldsProto.actuallyWatch.arrayValue.values,
                watched: response._fieldsProto.watched.arrayValue.values,
                favorite: response._fieldsProto.favorite.arrayValue.values
            };
            _this.server.res.send(user);
        });
    };
    return User;
}(controllers_1["default"]));
exports["default"] = User;


/***/ }),

/***/ "./server/core/controllers.ts":
/*!************************************!*\
  !*** ./server/core/controllers.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Controller = /** @class */ (function () {
    function Controller(server, dependency) {
        this.server = server;
        this.dependency = dependency;
    }
    return Controller;
}());
exports["default"] = Controller;


/***/ }),

/***/ "./server/database/config.json":
/*!*************************************!*\
  !*** ./server/database/config.json ***!
  \*************************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

module.exports = {"type":"service_account","project_id":"netbow-3248f","private_key_id":"581838bfb895e0de714f620d4100fd0e9a4149a1","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCPwqGOUerYY94\n3JvHRB0Xonp+UqpZJKKnQ3zZzx9jTzE8XaHFMvmAgVKZVHE3AvJ3+dCdGzknkpYC\nJdLg8qouZQGeaGcyY23PTv+ObG3ThAFO5ttbTAvSH28e9h8dBsw9YLfnlsVVn0FR\n83GNvf9oXKHB/NMQKgNslCsBshH/tRPkuCP87GKSYcntMNBEXT1yscndIFR4aayj\nOIIxfPQGLYvN5SkgZR5X+CkWAuyQAvDvXnXEp3NMcURnC3XVXZyEpeTYqKpghX9/\nYG7Efkxz/6zs4vXxWNtNo3Xg99XlNwhKSEaw0fJBouTkLrwRfDuGW0gFhzjzK7BD\nA4BbPliDAgMBAAECggEAAYbY4I0zl+WyL+FzIOOaY2ErG4eElXiQPrhQoZIUFKJp\nYRpO2sENJd+ldFVKd2dWFP3+j/2POzjW16rP/tdM/j2xcZBogsuLfkxPUz3rYNhy\nGi/FcZuX2moOnRc9sutfpc9ozU0wvTXEkaqNEX3qlx0t8TDVwL7FkeVaBL1krQuc\nPJv1vNFmrAXMf2tThSTdEyaP2SS0fJDffD8K/JZ3sbRYanrTIeXlxy8TY9re2vvD\nPSORFMrCeYpDlJQ1odvaQQASTR2n9q/U8RKhMjLXu2Rq55QsXwidjFLHGp1dT8da\nCPu0Nccfbv6+AVe1diTv4Vpa26Otlm2vyMn4N/g1AQKBgQDy8WRg9CPufUpeKzbY\nnTtsVcem7AKuJzHvHSK6B6AElXuLCXwV+mhSJYPnnmP8PwGaLCSvlHu8ZyQ96GLa\naOOgMUi6RTug0ZjP0z2w8f9eCGR3ntc+30WnwkF4iOiTqHH0/xGWhtnyzECgSLlY\njUUNxhOGFWHzvtDMrFJAtzksYwKBgQDMr6PhIRDvSd5laNQPt0lbJ+sTZ+UthuDo\ns6e5GzmQmOA3sAZsd2wPsNChMq/svpX9vdsEhNjOmg4uKmMJDob2KK7MHJ0YL9Ow\nxN3NwXgCEoRrpKWxgD7eCgGHXVlKSJasMn6LNATemWkPVUAWnN3SDVxqXKmhXnZI\nZ6giLvaNYQKBgQCSHvKbBfzeoukp/p/8ZYWqQWXWVjm+ecCk60dJ0PBEEYy/MbM6\nnORGFF5j33aP722NR2PBX3OU/AxmV/GtIE1YuovdzWpx7d8VkR6X4NYRvsZ+1EDu\nheglYMd0MhSBS11PWGNBwFYynPt57IPeaQnRoQN5MD88FdcMY9ENL6bptQKBgQCu\n8mSg1JFT5RA4Hww5zo/dYNYUxRVl/0WWv49YsINYKsJh9orXBI+RLbB0Rw2EzTUI\nJtDfIOjqVVRPcx0orYj/NrCIduByvtYx3WIzLexz4P3bv2N7vkB9qZG68DeUPUzD\nK3lrY2/SDs90MopPiY4yrgbSRhcafNGeezKC3R8QoQKBgA+qoXHPOQ4OBsIihMz3\nDSz9E8gqS8XFkadXtksjvuGsQCnLvLoDk6TkdDJ5gXA91DH8Ju5yajpZAlop78rb\n9/axWGHhCjhHaBM+xWAVkHOjCWp1B3/Tco7qYMlm5ksfJZcM3DJL0zze0SqoBx/M\njHOBEL/LPtV4YdtVzjCwWQ7K\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-y3x2t@netbow-3248f.iam.gserviceaccount.com","client_id":"114904442175590425064","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y3x2t%40netbow-3248f.iam.gserviceaccount.com"};

/***/ }),

/***/ "./server/database/firebase.ts":
/*!*************************************!*\
  !*** ./server/database/firebase.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var firebaseAdmin = __webpack_require__(/*! firebase-admin */ "firebase-admin");
var serviceAccount = __webpack_require__(/*! ./config.json */ "./server/database/config.json");
var USERS = 'Users';
var Firebase = /** @class */ (function () {
    function Firebase() {
        this.init();
    }
    Firebase.prototype.initFirestore = function () {
        this.db = this.admin.firestore();
    };
    Firebase.prototype.init = function () {
        this.admin = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: "https://netbow-3248f.firebaseio.com"
        });
        this.initFirestore();
        console.log('Firebase init');
    };
    Firebase.prototype.createUser = function (uid) {
        var clearUser = {
            actuallyWatch: [],
            watched: [],
            favorite: []
        };
        return this.db.collection(USERS).doc(uid).set(clearUser);
    };
    Firebase.prototype.getUser = function (uid) {
        return this.db.collection(USERS).doc(uid).get();
    };
    return Firebase;
}());
exports["default"] = Firebase;


/***/ }),

/***/ "./server/init.ts":
/*!************************!*\
  !*** ./server/init.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./config/index */ "./server/config/index.ts");
var dependency_1 = __webpack_require__(/*! ./config/dependency */ "./server/config/dependency.ts");
var port = 3000;
new index_1["default"](dependency_1["default"]).express.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ })

/******/ });
//# sourceMappingURL=backend.js.map