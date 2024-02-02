import React from 'react'

import { Platform } from '@/types/clients.types'
import YandexReviewList from './PlatformReview/YandexReview/YandexReviewList'
import GisReviewList from './PlatformReview/GisReview/GisReviewList'

export function selectReviewPlatformComponent(serviceName: string): React.ComponentType<any> | null {
  switch (serviceName) {
    case Platform.YANDEX:
      return YandexReviewList
    case Platform.GIS:
      return GisReviewList
    default:
      return null
  }
}
