export class PagedResult<T> {
  constructor(curentPage: number, pageSize: number, pageCount = 0) {
    this.currentPage = curentPage;
    this.pageSize = pageSize;
    this.pageCount = pageCount;
  }

  results: T[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
}
