import { LoginForm } from '@/components/forms/login-form';
import { AnimatedPreviewLogo } from '@/components/animated-preview-logo';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Login = () => {
  const [state, setState] = useState(true);

  setTimeout(() => setState(false), 2500);

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-10'>
      <AnimatePresence>{state && <AnimatedPreviewLogo />}</AnimatePresence>
      {!state && <LoginForm />}
    </div>
  );
};
