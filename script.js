const INPUTDATA = '"Nashville, TN", 36.17, -86.78;' +
    '"New York, NY", 40.71, -74.00;' +
    '"Atlanta, GA", 33.75, -84.39;' +
    '"Denver, CO", 39.74, -104.98;' +
    '"Seattle, WA", 47.61, -122.33;' +
    '"Los Angeles, CA", 34.05, -118.24;' +
    '"Memphis, TN", 35.15, -90.05;';

let cityMap = new CityMap(INPUTDATA);
inputStatesInSelect();
pullCitiesFromLS();
console.log(cityMap.cities);

function City(cityName, cityState, CityLatitude, CityLongitude) {
    this.name=cityName;
    this.state=cityState;
    this.latitude=CityLatitude;
    this.longitude=CityLongitude;
}

function CityMap(listOfCities) {
    this.cities = [];
    listOfCities.substring(0, listOfCities.length - 1).split(';').forEach((line) => {
        let cityFields = [];
        line.split(',').forEach(item => {
            cityFields.push(item.trim().replace(/["']/g,''));
        });
        this.cities.push(new City(...cityFields));
    });

    this.getStateAbbreviations = function () {
        let result = [];
        this.cities.forEach(city => {
            if (!result.includes(city.state)) {
                result.push(city.state);
            }
        });
        return result.join(' ');
    };

    this.getClosestCityName = function(latitude, longitude) {
        let distances = [];
        let closestCity = '';
        this.cities.forEach(city => {
            let distance = getDistance(latitude, longitude, city.latitude, city.longitude);
            distances.push(distance);
            if (distance <= Math.min(...distances)) closestCity = city.name;
        });
        return closestCity;
    };

    function getDistance(latitude1, longitude1, latitude2, longitude2,) {
        let a = Math.abs(latitude1 - latitude2);
        let b = Math.abs(longitude1 - longitude2);
        return Math.sqrt(Math.pow(a,2) + Math.pow(b,2) );
    }

    this.getRequestedCity = function(parameter) {
        let result = [];

        switch(parameter) {
            case "northernmost":
                result = this.cities.sort((a, b) => {
                    return a.latitude-b.latitude;
                });

                return result[result.length-1].name;

            case "southernmost":
                result = this.cities.sort((a, b) => {
                    return a.latitude-b.latitude;
                });
                return result[0].name;
            case "easternmost":
                result = this.cities.sort((a, b) => {
                    return a.longitude-b.longitude;
                });

                return result[result.length-1].name;

            case "westernmost":
                result = this.cities.sort((a, b) => {
                    return a.longitude-b.longitude;
                });
                return result[0].name;

            default: return null;
        }
    };

    this.addCity = function (city) {
        this.cities.push(city);
    };
}

function inputStatesInSelect(){
    let options = cityMap.getStateAbbreviations().split(' ');
    let select = document.getElementById('selectId');
    while (select.options.length > 0) {
        select.options.remove(0);
    }
    options.forEach((nameState, i) => {
        let option = document.createElement('option');
        option.value = i.toString();
        option.text = nameState;
        select.options.add(option);
    });
}

function searchCityByState() {
    let cities = [];
    let select = document.getElementById('selectId');
    let selected = Array.from(select.options)
        .filter(option => option.selected)
        .map(option => option.text);
    cityMap.cities.forEach(city => {
        if (selected[0] === city.state) cities.push(city.name);
    });
    alert(cities);
}

function addNewCity() {
    let name = document.getElementById('nameNewCity').value;
    let state = document.getElementById('stateNewCity').value;
    let latitude = document.getElementById('latitudeNewCity').value;
    let longitude = document.getElementById('longitudeNewCity').value;
    let newCity = new City(name,state, latitude, longitude);
    cityMap.addCity(newCity);
    localStorage.setItem('key '+ (cityMap.cities.length-1), JSON.stringify(newCity));
    inputStatesInSelect();
}

function pullCitiesFromLS() {
    if (localStorage.length > 0) {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            console.log(key);
            cityMap.cities.push(JSON.parse(localStorage.getItem(key)));
        }
    }
}
