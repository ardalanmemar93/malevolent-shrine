import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
const BASE_URL = 'https://api.jikan.moe/v4';



    
    // export default async function getCharacter(id) {
    //     const url = `${BASE_URL}/characters/${id}`;
      
    //     try {
    //       const response = await axios(url);
    //       const data = response.data;
      
    //       // Extract the relevant data and return it as an object
    //       const characterData = {
    //         name: data.data.name,
    //         imageUrl: data.data.images.jpg.image_url,
    //         nameKanji: data.data.name_kanji,
    //         about: data.data.about,
    //         favorites: data.data.favorites,
    //         id: data.data.mal_id,
    //       };
      
    //       return characterData;
    //     } catch (error) {
    //       console.error('Error fetching character data:', error);
    //       throw error;
    //     }
    //   }
      

    

    export default async function getCharacter(id) {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/characters/${id}`);
          
          if (response.data) {
            const data = response.data;
      
            // Check if the character data is available
            if (data.data) {
              // Extract the relevant data and return it as an object
              const characterData = {
                name: data.data.name,
                imageUrl: data.data.images && data.data.images.jpg && data.data.images.jpg.image_url,
                nameKanji: data.data.name_kanji,
                about: data.data.about,
                favorites: data.data.favorites,
                id: data.data.mal_id,
              };
      
              console.log('Character Data:', characterData);
              return characterData;
            } else {
              console.error('Character data not found:', data);
              return null; 
            }
          } else {
            console.error('Invalid response structure:', response);
            throw new Error('Invalid response structure');
          }
        } catch (error) {
          console.error('Error fetching character data:', error);
          throw error;
        }
      }
      
    



export async function searchCharacters(characterSearch) {
  try {
    const response = await axios.get(`${BASE_URL}/characters?q=${characterSearch}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for characters:', error);
    throw error;
  }
}





// export async function searchCharacters(characterSearch) {
//     let config = {
//        method: 'get',
//        maxBodyLength: Infinity,
//        url: `https://api.jikan.moe/v4/characters?q=${characterSearch}`,
//        headers: { }
//        };

//        axios.request(config)
//        .then((response) => {
//        console.log(JSON.stringify(response));
//        })
//        .catch((error) => {
//        console.log(error);
//        });
//    }



 
    // export default async function getCharacter(id) {
    //     let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: `https://api.jikan.moe/v4/anime/${id}/full`,
    //     headers: { }
    //     };

    //     axios.request(config)
    //     .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // }

