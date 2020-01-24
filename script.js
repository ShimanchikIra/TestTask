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

}
