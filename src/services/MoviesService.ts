import * as t from "io-ts"
import * as tPromise from 'io-ts-promise';
import { ServiceResponse} from '../types/Service';

const Movie = t.type({
  title: t.string,
  overview: t.string
})
const Movies = t.array(Movie);

type Movies = t.TypeOf<typeof Movies>

const MoviesListValidation = t.type({
  results: Movies
});

const FetchUpcomingMovieService = async(): Promise<ServiceResponse> => {
  try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`);
      const result = await response.json();
      const typeSafeData = await tPromise.decode(MoviesListValidation, result);
      return Promise.resolve({ response: "success", message: "data fetched successfully", payload: typeSafeData.results });
  }
  catch(error){
    if (tPromise.isDecodeError(error)) {
      return Promise.reject({ response: "error", message: "Request failed due to invalid data.", payload: [] })
    } else {
      return Promise.reject({
        response: "error", message: "Request failed due to internal server error", payload: []
      })
    }
  }
}


const SearchMovieService = async (searchTerm = 'all'): Promise<ServiceResponse> => {
  try{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
    const result = await response.json();
    const typeSafeData = await tPromise.decode(MoviesListValidation, result);
    return Promise.resolve({ response: "success", message: "data fetched successfully", payload: typeSafeData.results });
  }
  catch(error){
    if (tPromise.isDecodeError(error)) {
      return Promise.resolve({ response: "error", message: "Request failed due to invalid data.", payload: [] })
    } else {
      return Promise.resolve({
        response: "error", message: "Request failed due to internal server error", payload: []
      })
    }
  }
};

export {
  FetchUpcomingMovieService,
  SearchMovieService
};