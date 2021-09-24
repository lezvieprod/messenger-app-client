export interface IResponseError {
  title: string,
  message: string
}
export interface IQueryErrorResponse {
  data: IResponseError | string,
  status?: string | number,
  error?: string
}