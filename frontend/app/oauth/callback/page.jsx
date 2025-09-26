import React, { Suspense } from 'react';
import CallbackClient from './CallbackClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackClient />
    </Suspense>
  );
}