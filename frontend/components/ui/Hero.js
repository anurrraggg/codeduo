'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ status }) {
  const imageSrc =
    status === 'won' ? '/sprites/mascotf2.png' : '/sprites/mascotf1.png';

  if (status === 'lost') {
    return (
      <div className="absolute w-full h-full flex justify-center items-center">
        <Image
          src="/sprites/lost-hero.png"
          alt="lost"
          width={100}
          height={100}
          priority
          className="object-contain"
        />
      </div>
    );
  }

  // base bounce animation
  const animationProps =
    status === 'won'
      ? { y: [0, -40, 0], rotate: [0, 720] }
      : { y: [0, -40, 0] };

  // separate transition for rotation if needed
  const transitionProps =
    status === 'won'
      ? {
          y: { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
        }
      : {
          y: { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
        };

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <motion.div animate={animationProps} transition={transitionProps}>
        <Image
          src={imageSrc}
          alt="hero"
          width={100}
          height={100}
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
