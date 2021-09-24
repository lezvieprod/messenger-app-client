import { IResponseError } from "../types/models/Error";



/*  
  Проверяем ошибку на соответствие типу IResponseError 
  Если возвращается true то ошибка от API, иначе ошибка кода / недоступности сервера
*/
export const isApiError = (candidate: any): candidate is IResponseError => {
  return typeof candidate.title === 'string' || typeof candidate.message === 'string' ;
};