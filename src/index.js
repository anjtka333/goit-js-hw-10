import './css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const img = document.querySelector('img');
const filterNames = function (e) {
  if (!e.target.value) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  return fetchCountries(e.target.value.trim()).then(countryes => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (countryes.length === 1) {
      countryInfo.innerHTML = `
          <ul class="list-group">
           <li class="list-group-item col-4"><img src ="${countryes[0].flags.svg}"></li>
            <li class="list-group-item list-group-item-primary  col-4">${countryes[0].name}</li>
            <li  class="list-group-item col-4">${countryes[0].capital}</li>

            <li  class="list-group-item  col-4">${countryes[0].languages
              .map(lang => lang.name)
              .join(', ')}</li>
            <li  class="list-group-item  col-4">${countryes[0].population}</li>
          </ul>
      `;
      document.querySelector('img').classList.add('img-thumbnail');
    } else if (countryes.length >= 2 && countryes.length <= 10) {
      let markup;
      markup = countryes
        .map(
          item => ` 
        <li class="h5 alert alert-primary col-5 text-light"><span class="col-5" style="width: 400px; height: 200px; background-size:cover; background-position:center; background-image: url(${item.flags.svg}); display:block" </span><mark>${item.name}<mark></li>`,
        )
        .join('');
      countryList.insertAdjacentHTML('beforeend', markup);
      countryList.style.listStyle = 'none';
    } else if (countryes.length > 10) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
  });
};
input.addEventListener('input', debounce(filterNames, DEBOUNCE_DELAY));

/* Option 2*/
// const filterNames = function (e) {
//   if (!e.target.value) return;
//   return fetchCountries()
//     .then(arrCountries =>
//       arrCountries.filter(country =>
//         country.name.toLowerCase().includes(e.target.value.toLowerCase().trim()),
//       ),
//     )
//     .then(countryNames => {
//       console.log(countryList.innerHTML);
//       countryList.innerHTML = '';
//       if (countryNames.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//       } else if (countryNames.length >= 2 && countryNames.length <= 10) {
//         countryList.innerHTML = '';
//         let listOfCountyes;
//         let countryName = countryNames.map(countryName => countryName.name);
//         let countryFlag = countryNames.map(countryNames => countryNames.flag);
//         let country = '';
//         let listOfCountryFlags = '';
//         for (let i = 0; i < countryName.length; i++) {
//           listOfCountyes = countryName[i];
//           listOfCountryFlags = countryFlag[i];
//           country += `<li><span><img src="${listOfCountryFlags}" alt="" width = 100px></span>${listOfCountyes}</li>`;
//         }
//         countryList.innerHTML = country;
//       } else if (countryNames.length === 1) {
//         countryList.innerHTML = '';
//         let listOfCountryes;
//         let countryName = countryNames.map(countryName => countryName.name);
//         let countryFlag = countryNames.map(countryNames => countryNames.flag);
//         let countryCapital = countryNames.map(
//           (countryNames, key) => countryNames.capital,
//           countryNames.key,
//         );
//         let countryPopulation = countryNames[0].population;
//         let countryLang = countryNames.map(item => item.languages[0].name);
//         console.log(countryNames);
//         let country = '';
//         let listOfCountryFlags = '';
//         let listOfCapitals = '';
//         let listOfPopulation = '';
//         let listOfCountryLang = '';
//         for (let i = 0; i < countryName.length; i++) {
//           listOfCountryes = countryName[i];
//           listOfCountryFlags = countryFlag[i];
//           listOfCapitals = countryCapital[i];
//           listOfPopulation = countryPopulation[i];
//           listOfCountryLang = countryLang[i];
//           country += `<li><span><img src="${listOfCountryFlags}" alt="" width = 100px></span>${listOfCountryes}</li>
//           <li>Country: ${listOfCapitals}</li>
//           <li>Population: ${countryPopulation}</li>
//           <li>Languages: ${listOfCountryLang}</li>`;
//         }
//         countryList.innerHTML = country;
//       }
//     });
// };
// input.addEventListener('input', debounce(filterNames, DEBOUNCE_DELAY));
