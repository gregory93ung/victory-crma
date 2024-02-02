import { Clients } from '@/types';
import { selectReviewPlatformComponent } from './utils';

type PlatformReviewSelectorProps = {
  service: Clients.platform;
  cardId: number;
};

export const PlatformReviewSelector = ({
  cardId,
  service,
}: PlatformReviewSelectorProps) => {
  const ServiceComponent = selectReviewPlatformComponent(service);

  if (ServiceComponent) {
    return <ServiceComponent cardId={cardId} />;
  } else {
    return null;
  }
};
