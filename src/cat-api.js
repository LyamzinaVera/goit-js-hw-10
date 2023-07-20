import axios from "axios";


axios.defaults.headers.common["x-api-key"] = "live_PpmnH5IM6AyK8355OfAWTEqraL0ErweE8bIZNFdVXultIMbcAr4oXGD4t5oJQfh8";


export function fetchCatByBreed(breedId) {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
        });
}

export function fetchBreeds() {
    return axios
        .get("https://api.thecatapi.com/v1/breeds")
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
        });
}