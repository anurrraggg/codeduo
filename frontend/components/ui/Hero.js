'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ status }) {
  if (status === 'lost') {
    return (
      <Image
        src="/sprites/lost-hero.png"
        alt="lost"
        width={100}
        height={100}
        priority
        className="object-contain"
      />
    );
  }

  // choose image for won/idle
  const imageSrc =
    status === 'won' ? '/sprites/mascotf2.png' : '/sprites/mascotf1.png';

  // bounce animation (outer wrapper)
  const bounce = {
    y: status === 'won' ? [0, -40, 0] : [0, -40, 0],
  };

  const bounceTransition = {
    y: { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
  };

  // rotation animation (inner wrapper)
  const spin =
    status === 'won'
      ? { rotate: [0, 720] }
      : {};

  const spinTransition =
    status === 'won'
      ? { rotate: { duration: 2, repeat: Infinity, ease: 'linear' } }
      : {};

  return (
    <motion.div
      animate={bounce}
      transition={bounceTransition}
      className="inline-block"
    >
      <motion.div
        animate={spin}
        transition={spinTransition}
        className="inline-block origin-center"
        style={{ transformOrigin: '50% 50%' }} 
      >
        <Image
          src={imageSrc}
          alt="hero"
          width={100}
          height={100}
          priority
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}