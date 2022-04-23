export class PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];

  total: number;

  total_pages: number;

  page: number;

  limit: number;
}
