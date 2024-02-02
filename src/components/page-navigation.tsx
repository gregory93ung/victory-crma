import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface PageNavigationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((el) => el + start);
};

const getPagesCut = ({
  pagesCount,
  pagesCutCount,
  currentPage,
}: {
  pagesCount: number;
  pagesCutCount: number;
  currentPage: number;
}) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);
  console.log('ceiling', ceiling);
  console.log('floor', floor);

  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

export function PageNavigation({
  currentPage,
  total,
  limit,
  onPageChange,
}: PageNavigationProps) {
  const pagesCount = Math.ceil(total / limit);

  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <Pagination className='justify-start'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={isFirstPage}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page} onClick={() => onPageChange(page)}>
            <PaginationLink
              disabled={page === currentPage}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={isLastPage}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
