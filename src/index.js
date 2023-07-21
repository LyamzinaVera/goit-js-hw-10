import { fetchCatByBreed, fetchBreeds } from './cat-api';
import axios from 'axios';

const API_KEY = "live_PpmnH5IM6AyK8355OfAWTEqraL0ErweE8bIZNFdVXultIMbcAr4oXGD4t5oJQfh8";
axios.defaults.headers.common['x-api-key'] = API_KEY;

import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
    selectBreedEl: document.querySelector('.breed-select'),
    catInfoEl: document.querySelector('.cat-info'),
    loaderEl: document.querySelector('.loader'),
};

window.addEventListener('load', () => {
    refs.selectBreedEl.classList.add('hidden');
    fetchBreeds()
        .then(cats => {
            const html = cats.reduce((acc, { id, name }) => {
                return acc + `<option value="${id}">${name}</option>`;
            }, '');
            refs.selectBreedEl.insertAdjacentHTML('beforeend', html);

            new SlimSelect({
                select: '.breed-select',
            });

            refs.loaderEl.classList.add('hidden');
            refs.selectBreedEl.classList.remove('hidden');

        })
        .catch(error => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
            );
        })
});

refs.selectBreedEl.addEventListener('change', eve => {
    fetchCatByBreed(refs.selectBreedEl.value)
        .then(({ catImg, catName, catDescription, catTemperament }) => {
            refs.loaderEl.classList.remove('hidden');
            refs.catInfoEl.innerHTML = '';
            const html = `
            <div class="cat-img-container">
             <img src="${catImg}" alt="${catName}" class="cat-img" width="600px" height="500px">
            </div>
           <div class="cat-text-cont">
            <h2>${catName}</h2>
            <p>${catDescription}</p>
             <p><b>Temperament:</b> ${catTemperament}</p>
           </div>`;
            refs.catInfoEl.insertAdjacentHTML('beforeend', html);
            refs.loaderEl.classList.add('hidden');
        })
        .catch(error => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
            );
        })
})