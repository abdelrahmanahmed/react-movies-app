import * as t from "io-ts"

const ServiceInterface = t.type({
  message: t.string,
  response: t.string,
  payload: t.any
});
export type ServiceResponse = t.TypeOf<typeof ServiceInterface>
