import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types/prouduct";

export default function PaginateArea({
  paginate,
}: {
  paginate: PaginationType;
}) {
  const pages: number[] = [];
  if (paginate?.totalPage) {
    for (let i = 0; i < paginate.totalPage; i++) {
      pages.push(i);
    }
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              paginate?.currentPage <= 1
                ? "text-gray-200 hover:text-gray-200 hover:bg-transparent cursor-not-allowed"
                : ""
            }
            to={`/products?page=${paginate?.prevPage}`}
          />
        </PaginationItem>
        {pages?.map((_, id) => (
          <PaginationItem key={id}>
            <PaginationLink to={`/products?page=${id + 1}`}>
              {id + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              paginate?.currentPage === paginate?.totalPage
                ? "text-gray-200 hover:text-gray-200 hover:bg-transparent cursor-not-allowed"
                : ""
            }
            to={`/products?page=${paginate?.nextPage}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
