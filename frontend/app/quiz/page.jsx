'use client';

import Header from '@/components/Header';
import QuizCataloguePage from '@/components/QuizCataloguePage';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function QuizCatalogueContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      <Header />
      <QuizCataloguePage quizCategoryId={id} />
    </div>
  );
}

export default function QuizCatalogue() {
  return (
    <Suspense fallback={<div>Loading quizzes...</div>}>
      <QuizCatalogueContent />
    </Suspense>
  );
}