import { useState, useEffect } from 'react';

const useInfiniteScroll = (
  callback: () => void
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 60
    ) {
      setIsFetching(true);
    }
  };

  // useEffect(() => {
  //   if (!isFetching) return;
  //   callback();
  // }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
