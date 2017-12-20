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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const ListView = __webpack_require__(1);
const Request = __webpack_require__(2);

const listView = new ListView();
const request = new Request("http://localhost:3000/api/bucketlist");
const requestCountryAPI = new Request("https://restcountries.eu/rest/v2/all")

const app = function(){

  const selectDropDown = document.querySelector('#dropDown');
  requestCountryAPI.get(getCountiresRequestComplete);


  // selectDropDown.addEventListener('change', )
}

const addToList = function(country){

  const ul = document.querySelector('ul');
  const liName = document.createElement('li');
  liName.innerText = country.name;
  const liCapital = document.createElement('li');
  liCapital.innerText = country.capital;
  const liFlag = document.createElement('img');
  liFlag.src = country.flag;
  liFlag.style.width = "50px";
  ul.appendChild(liName);
  ul.appendChild(liCapital);
  ul.appendChild(liFlag);
}

const getCountiresRequestComplete = function(allCountries){
    listView.render(allCountries);

    const button = document.querySelector('button');
    button.addEventListener('click', function(){
      // addToList(allCountries);
      const selectIndex = document.querySelector('#dropDown').value;

      const body = {
        name: allCountries[selectIndex].name,
        capital: allCountries[selectIndex].capital,
        flag: allCountries[selectIndex].flag
      }

      request.post(addToList, body);
    })
  }


document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const ListView = function(){
  this.countries = [];
}

// ListView.prototype.addAllCountries = function(countries){
//   this.countries = countries;
//   this.render(countries);
// }

ListView.prototype.render = function(countries){
  this.countries = countries;
  const dropDown = document.querySelector('#dropDown');
  console.log("render",countries);
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name
    option.value = index;
    dropDown.appendChild(option);
  })


}

module.exports = ListView;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
  this.responseBody = [];
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if (this.status !== 200){
      return;
    };
    this.responseBody = JSON.parse(this.responseText);
    console.log("responseBody", this.responseBody);
    callback(this.responseBody);
  });
  request.send();
};

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);

  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if (this.status!==201) {
      return;
    };
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(body));
};

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if (this.status!==204) {
      return;
    };
    callback();
  });
  request.send();
};

module.exports = Request;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map