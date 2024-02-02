import React from 'react';
import { GisAccountingReviewList } from './OrderServices/GisAccounting/GisAccountingReviewList';
import { GisDeletingReviewList } from './OrderServices/GisDeleting/GisDeletingReviewList';
import { GisWriterReviewList } from './OrderServices/GisWriter/GisWriterReviewList';
import { YandexAccountingReviewList } from './OrderServices/YandexAccounting/YandexAccountingReviewList';
import { YandexDeletingReviewList } from './OrderServices/YandexDeleting/YandexDeletingReviewList';
import { YandexWriterReviewList } from './OrderServices/YandexWriter/YandexWriterReviewList';

export function selectServiceComponent(
  serviceId: number,
): React.ComponentType<any> | null {
  switch (serviceId) {
    case 1:
      return GisWriterReviewList;
    case 2:
      return GisDeletingReviewList;
    case 5:
      return GisAccountingReviewList;
    case 3:
      return YandexWriterReviewList;
    case 4:
      return YandexDeletingReviewList;
    case 6:
      return YandexAccountingReviewList;
    default:
      return null;
  }
}
