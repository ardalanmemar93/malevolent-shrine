const BASE_URL = 'https://api.jikan.moe/v4';


export default async function getCharacter(id) {
    const url = `${BASE_URL}/characters/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data)
    console.log(data.data.images.jpg.image_url)
    return data.data;
    };

    //wrap that in a n image and pass it to the character component

    //this will becaime my sopurce atribute in my image html 
    //console.log(data.data.images.jpg.image_url)