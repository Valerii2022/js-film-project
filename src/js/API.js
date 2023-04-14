import axios from 'axios';

export class ThemoviedbAPI {
  #API_KEY = '40e15dc62f9875135cfe2bf57a204366';
  #BASE_API = 'https://api.themoviedb.org';

  async fetchPopulareFilms() {
    try {
      return await axios.get(
        `${this.#BASE_API}/3/trending/movie/week?api_key=${this.#API_KEY}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchFilmByKeywords(query) {
    try {
      return await axios.get(
        `${this.#BASE_API}/3/search/movie?api_key=${
          this.#API_KEY
        }&query=${query}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchFullFilmInfo(id) {
    try {
      return await axios.get(
        `${this.#BASE_API}/3/movie/${id}?api_key=${this.#API_KEY}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchFilmVideo(id) {
    try {
      return await axios.get(
        `${this.#BASE_API}/3/movie/${id}/videos?api_key=${
          this.#API_KEY
        }&language=en-US`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
