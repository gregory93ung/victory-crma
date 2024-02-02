import { Clients } from '@/types';
import { selectServiceComponent } from './utils';

type ServiceReviewSelectorProps = {
  service: Clients.IService;
  orderId: number;
  firmUrl: string;
};

export const ServiceReviewSelector = ({
  orderId,
  service,
  firmUrl,
}: ServiceReviewSelectorProps) => {
  const ServiceComponent = selectServiceComponent(service.id);

  if (ServiceComponent) {
    return (
      <ServiceComponent
        orderId={orderId}
        firmUrl={firmUrl}
        serviceId={service.id}
      />
    );
  } else {
    return null;
  }
};
