'use client';
import QuizPage from '@/components/QuizPage'
import { useParams } from 'next/navigation'
import React from 'react'

function Quiz() {
    const { id } = useParams();

    return (
        <div>
            <QuizPage quizId={id} />
        </div>
    )
}

export default Quiz
