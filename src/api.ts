import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchTickerInfo(coinId: string) {
  return fetch(`${BASE_URL}/ticker/${coinId}`).then((response) =>
    response.json()
  );
}

//export function fetchCoinHistory(coinId: string) {
//  const endDate = Math.floor(Date.now() / 1000);
//  const startData = endDate - 60 * 60 * 24 * 7;
//
//  return fetch(
//    //     `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${endDate}&end=${endDate}`
//    //   ).then((response) => response.json());
//    //coinpaprika 유료로 실행안됨
//
//    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
//  ).then((response) => response.json());
//}

export function fetchCoinHistory(coinId: string) {
  return axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((response) => {
      console.log(response, "bbbbbbbbbbbbbbbb");
      return response.data;
    });
}
