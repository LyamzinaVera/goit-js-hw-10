import axios from "axios";


axios.defaults.headers.common["x-api-key"] = "live_PpmnH5IM6AyK8355OfAWTEqraL0ErweE8bIZNFdVXultIMbcAr4oXGD4t5oJQfh8";


function fetchBreeds() {
    return axios
        .get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            // handle success
            return response.data;
        })
        .then(data => {
            return data.map(cat => {
                return { id: cat.id, name: cat.name };
            });
        });
}


function fetchCatByBreed(breedId) {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data;
        })
        .then(([data]) => {
            console.log(data.breeds[0]);
            return {
                catImg: data.url,
                catName: data.breeds[0].name,
                catDescription: data.breeds[0].description,
                catTemperament: data.breeds[0].temperament,
            };
        });
}

export { fetchBreeds, fetchCatByBreed };