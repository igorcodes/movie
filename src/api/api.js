import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "4237669ebd35e8010beee2f55fd45546";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjM3NjY5ZWJkMzVlODAxMGJlZWUyZjU1ZmQ0NTU0NiIsInN1YiI6IjVkMzc0NjVkZTU0ZDVkMjBhNGRiZDRlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QkywZtcqMOTYX-fvvag8B-1DVXxaFEgVDumJkqV6oE0";
  

export const callApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};

