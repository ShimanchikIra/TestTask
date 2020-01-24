let inputData = '"Nashville, TN", 36.17, -86.78;' +
    '"New York, NY", 40.71, -74.00;' +
    '"Atlanta, NY", 33.75, -84.39;' +
    '"Denver, CO", 39.74, -104.98;' +
    '"Seattle, WA", 47.61, -122.33;' +
    '"Los Angeles, CA", 34.05, -118.24;' +
    '"Memphis, TN", 35.15, -90.05;';

function City(cityName, cityState, CityLatitudes, CityLongitudes) {
    this.name=cityName;
    this.state=cityState;
    this.latitudes=CityLatitudes;
    this.longitudes=CityLongitudes;
}

function CityMap(listOfCities) {
    this.cities = [];
    listOfCities.substring(0, listOfCities.length - 1).split(';').forEach(line => {
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
}

