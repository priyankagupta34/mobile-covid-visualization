export const CovidServices = {
    countryName,
    todaysSummary,
    countryWiseData,
    totalCount,
    listAllCountries,
    listAllLatLongs,
    getCountryPopulation,
    getNotifications,
    stateWiseForIndiaMinComplete,
    stateWiseForIndia,
    stateWiseForIndiaForActiveCase
}

const axios = require('axios');
const server = 'https://api.covid19api.com/';

function countryName() {
    return axios.get(`https://api.ipdata.co/?api-key=e618a48e0a90e21b3a11b322b03b4ad0109844b2b9701b103c7d06af`);
}

function todaysSummary() {
    return axios.get(`${server}summary`);
}

function countryWiseData(country) {
    return axios.get(`${server}total/dayone/country/${country}`);
    // return axios.get(`${server}country/${country}`);
}

function totalCount() {
    return axios.get(`${server}world/total`);
}

function listAllCountries() {
    return axios.get(`${server}countries`);
}

function listAllLatLongs() {
    return axios.get('countrycode-latlong-array.json');
}

function getCountryPopulation(countrycode) {
    axios.get('country-by-code-population.json')
        .then((result) => {
            result.data.forEach(element => {
                if (element.code === countrycode) {
                    return element.population;
                }
            });
        }).catch((err) => {

        });
}


function getNotifications() {
    return axios.get('https://api.covid19india.org/updatelog/log.json');
}

function stateWiseForIndiaMinComplete() {
    return axios.get('https://api.covid19india.org/v5/min/data.min.json');
}

function stateWiseForIndia() {
    return axios.get('https://api.covid19india.org/state_district_wise.json');
}

function stateWiseForIndiaForActiveCase() {
    return axios.get('https://api.covid19india.org/data.json');
}