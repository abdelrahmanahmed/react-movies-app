import * as t from "io-ts"
import * as tPromise from 'io-ts-promise';
import { ServiceResponse } from '../types/Service';


const MovieMandatoryFields = t.type({
  id: t.number,
})
const MovieOptionalFields = t.partial({
  original_title: t.string,
  original_name: t.string
})

const Movies = t.array(t.intersection([MovieMandatoryFields, MovieOptionalFields]));

type Movies = t.TypeOf<typeof Movies>


const Actor = t.type({
  name: t.string,
  known_for: Movies
})
const Actors = t.array(Actor);

type Actors = t.TypeOf<typeof Actors>

const ActorsListValidation = t.type({
  results: Actors
});

const FetchActorsService = async (searchTerm): Promise<ServiceResponse> => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
    const result = await response.json();
    const typeSafeData = await tPromise.decode(ActorsListValidation, result);
    return Promise.resolve({ response: "success", message: "data fetched successfully", payload: typeSafeData.results });
  }
  catch (error) {
    console.log("error", error);
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
  FetchActorsService,
};