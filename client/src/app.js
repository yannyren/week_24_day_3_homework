const ListView = require('./views/listView.js');
const Request = require('./services/request.js');

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
