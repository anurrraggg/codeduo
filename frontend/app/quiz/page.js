'use client';
import Header from '@/components/Header'
import QuizCataloguePage from '@/components/QuizCataloguePage'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function QuizCatalogue() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div>
            <Header />
            <QuizCataloguePage quizCateroryId={id} />
        </div>
    )
}

export default QuizCatalogue
