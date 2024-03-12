// scrollPagination.ts

import { useEffect } from 'react';

interface ScrollPaginationProps {
  fetchMore: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  pageSize: number;
  isSmallScreen: boolean;
}

const useScrollPagination = ({
  fetchMore,
  containerRef,
  currentPage,
  totalPages,
  loading,
  pageSize,
  isSmallScreen,
}: ScrollPaginationProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
          containerRef.current.clientHeight &&
        currentPage < totalPages &&
        !loading &&
        !isSmallScreen
      ) {
        fetchMore();
      }
    };

    if (!isSmallScreen) {
      containerRef.current?.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (!isSmallScreen) {
        containerRef.current?.removeEventListener('scroll', handleScroll);
      }
    };
  }, [
    fetchMore,
    containerRef,
    currentPage,
    totalPages,
    loading,
    pageSize,
    isSmallScreen,
  ]);
};

export default useScrollPagination;
