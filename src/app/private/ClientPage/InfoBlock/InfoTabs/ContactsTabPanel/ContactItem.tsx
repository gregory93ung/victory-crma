import { clients } from '@/api/query.key';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactCardContextMenu } from '@/components/context-menu/contact-card-context-menu';
import { queryClient } from '@/config/client';

export interface ContactItemProps {
  id: number;
  title: string;
  phone: string | null;
  email: string | null;
  comment: string | null;
}

function ContactItem({ id, title, phone, email, comment }: ContactItemProps) {
  const { client_id } = useParams();
  const currentContact = { id, title, phone, email, comment };

  const onDelClientContact = (data: any) => {
    toast('Удаление контакта у клиента', {
      description: data.detail,
    });

    queryClient.invalidateQueries([
      'getAllContactsClient',
      { slug: client_id },
    ]);
  };

  const { mutate: delContact } = useMutation(clients.deleteSpecificContact.fn, {
    onSuccess: (data) => onDelClientContact(data),
    onError: (error) => console.error('Ошибка:', error),
  });

  const handleDelContact = () => {
    delContact({ params: { contact_id: id } });
  };

  return (
    <ContactCardContextMenu
      title={title}
      currentContact={currentContact}
      handleDelContact={handleDelContact}
    >
      <Card className='w-full bg-layer-02 border border-border-subtitle-02 rounded'>
        <CardHeader>
          <CardTitle>{title ? title : 'Не указано'}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-row gap-2 items-center'>
            <Phone className='w-4 h-4 stroke-muted-foreground' />
            <p
              className={cn(
                'font-regular text-text-primary',
                !phone && 'text-text-disabled',
              )}
            >
              {phone ? phone : 'Телефон не указан'}
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Mail className='w-4 h-4 stroke-muted-foreground' />
            <p
              className={cn(
                'font-regular text-text-primary',
                !email && 'text-text-disabled',
              )}
            >
              {email ? email : 'Почта не указана'}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full p-2 pl-3 bg-layer-03 rounded'>
            <p
              className={cn(
                'font-regular text-text-primary',
                !comment && 'text-text-disabled',
              )}
            >
              {comment ? comment : 'Комментарий не указан'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </ContactCardContextMenu>
  );
}

export default ContactItem;
