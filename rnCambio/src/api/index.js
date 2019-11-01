import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.exchangeratesapi.io/'
});

const fromBase = base => {
    api.get(`latest?base=${base}`);
}

module.exports = {
    fromBase,
}