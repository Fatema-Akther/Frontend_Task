'use client';

import React, { Suspense } from 'react';
import SearchContent from './SearchContent'; // move your actual code to a new file (see below)

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">লোড হচ্ছে...</div>}>
      <SearchContent />
    </Suspense>
  );
}
