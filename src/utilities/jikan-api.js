import axios from 'axios';
const BASE_URL = 'https://api.jikan.moe/v4';


export default async function getCharacter(id) {
    const url = `${BASE_URL}/characters/${id}`;
    const response = await axios(url);
    const data = response.data;
    console.log(data.data)
    console.log(data.data.images.jpg.image_url)
    console.log(data.data.name_kanji)
    console.log(data.data.about)
    console.log(data.data.favorites)
    return data.data;
    };

    //wrap that in a n image and pass it to the character component

    //this will becaime my sopurce atribute in my image html 
    //console.log(data.data.images.jpg.image_url)