import React from 'react';
import { Star } from 'lucide-react';

type RatingProps = {
  value: number;
};

export const Rating = ({ value }: RatingProps) => {
  const maxIcons = 5;

  const icons = Array.from({ length: maxIcons }, (_, index) =>
    React.cloneElement(<Star />, {
      key: index,
      className: `w-4 h-4 stroke-yellow-30-value ${
        index < value ? 'fill-yellow-30-value' : ''
      }`,
    }),
  );

  return <div className='flex flex-row gap-2'>{icons}</div>;
};
