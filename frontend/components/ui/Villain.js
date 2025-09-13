'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Villain() {
    const frames = [
        '/sprites/villain-frame-1.png',
        '/sprites/villain-frame-2.png',
        '/sprites/villain-frame-3.png',
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Change frame every 400 ms (~2.5 fps)
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % frames.length);
        }, 200);

        // Clear interval when component unmounts
        return () => clearInterval(id);
    }, [frames.length]); // include frames.length for completeness

    return (
        <Image
            className='z-[-15]'
            src={frames[index]}
            alt="villain"
            width={100}
            height={100}
            priority
        />
    );
}
