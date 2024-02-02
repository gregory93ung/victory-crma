import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Clients } from '@/types';

import { ReactNode, useState } from 'react';
import { RespGisDeletingOldReviewModalContent } from './resp-gis-deleting-old-review-modal-content';
import { RespGisDeletingReviewModalContent } from './resp-gis-deleting-review-modal-content';

interface ResGisDeletingReviewModalProps {
  reviewInfo: Clients.GisDeletingReview;
  firmUrl: string;
  orderId: number;
  serviceId: number;
  children: ReactNode;
}

export function RespGisDeletingReviewModal({
  reviewInfo,
  children,
  firmUrl,
  orderId,
  serviceId,
}: ResGisDeletingReviewModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      {reviewInfo.old ? (
        <RespGisDeletingOldReviewModalContent
          orderId={orderId}
          reviewInfo={reviewInfo}
          firmUrl={firmUrl}
          serviceId={serviceId}
          setOpen={setOpen}
        />
      ) : (
        <RespGisDeletingReviewModalContent
          orderId={orderId}
          reviewInfo={reviewInfo}
          firmUrl={firmUrl}
          serviceId={serviceId}
          setOpen={setOpen}
        />
      )}
    </Dialog>
  );
}
