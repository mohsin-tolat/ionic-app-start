export class PagedResult<T> {
  constructor(curentPage: number, pageSize: number) {
    this.currentPage = curentPage;
    this.pageSize = pageSize;
  }

  results: T[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
}
