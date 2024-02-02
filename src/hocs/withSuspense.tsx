import { Suspense, ComponentType } from 'react';

export default function withSuspense<P>(Component: ComponentType & any) {
  return function WithSuspense(props: P) {
    return (
      <Suspense fallback={''}>
        <Component {...props} />
      </Suspense>
    );
  };
}
