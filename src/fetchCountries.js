import { Notify } from 'notiflix/build/notiflix-notify-aio';
export const fetchCountries = function (name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,currencies,languages,flags`,
  )
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 404) {
        Notify.failure('Oops, there is no country with that name');
      }
      return data;
    });
};

// Option 2
// export const fetchCountries = function () {
//   return fetch(
//     'https://restcountries.com/v2/all?fields=name,capital,population,currencies,languages,flag',
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     });
// };
