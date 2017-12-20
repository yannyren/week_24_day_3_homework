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
