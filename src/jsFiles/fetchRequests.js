import axios from 'axios';

export const receivedImages = async (typedValue, pageNum) => {
  const url = `https://pixabay.com/api/?key=36761975-e2cf261ee0afc31e5120bc8bc&q=${typedValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNum}`;
  try {
    const resp = await axios.get(url);
    const { data } = resp;
    const { totalHits, hits } = data;
    return { totalHits, hits };
  } catch (err) {
    console.log(err);
  }
};
