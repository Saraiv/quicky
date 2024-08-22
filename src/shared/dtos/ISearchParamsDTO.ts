export interface ISearchOrderBy {
  sort: string;
  order: 'ASC' | 'DESC' | undefined;
}

export default interface ISearchParamsDTO {
  query?: string;
  page?: number;
  limit?: number;
  orderBy?: ISearchOrderBy;
}

interface ISearchParamsRequestQuery {
  query?: any;
  page?: any;
  limit?: any;
  orderBy?: any;
}

export function requestQueryToSearchParams(
  requestQuery: ISearchParamsRequestQuery
): ISearchParamsDTO {
  const { query, page, limit, orderBy } = requestQuery;

  const params: ISearchParamsDTO = {};
  params.orderBy = orderBy
    ? ((orderBy as unknown) as ISearchOrderBy)
    : undefined;
  params.limit = limit ? Number(limit) : undefined;
  params.page = limit ? Number(page) : undefined;
  params.query = limit ? String(query) : undefined;

  return params;
}
