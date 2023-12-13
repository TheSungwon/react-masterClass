const API_KEY = "dc921e41cb528b0abd015353b9f36f29";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (result) => result.json()
  );
}

// export function fetchCoinHistory(coinId: string) {
//     return axios
//       .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
//       .then((response) => {
//         console.log(response, "bbbbbbbbbbbbbbbb");
//         return response.data;
//       });
//   }
