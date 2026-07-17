import { Product, QuizQuestion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'starter-kit',
    name: 'Cloudy Starter Kit',
    tagline: 'All-in-one plant-powered ritual set',
    description: 'Our signature set featuring our top wellness formulas. Includes our melatonin sleep diffuser, calm diffuser, focus diffuser, and caffeine energy diffuser. Each is formulated with dynamic, clean botanicals to guide your daily rhythm.',
    price: 48,
    originalPrice: 60,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvbjmJu2ngJ1o9Q8KOlM8xvPJcOhD4W0F2VdKu5JXU4dncPpxSchTfswaVAhaM_c2w3eGEH7t5iLB2pxTJ2fe31BrLErPNiaWnFB_MqWsumnvGvQ8ndQ9HUzb_-XyqVZFV1rmw8Z3pWhzMWe4qkKEB2aI7GsJenCa5vorXZGY0h4Ww4eQ6630wVrKnGxXfouRGEbQ_xCYA2d5gezBOwkPjZLaLYT9i5IrOQtF2oC90mcV7LlYxe2Ai17MZ4',
    rating: 5.0,
    reviewsCount: 1840,
    category: 'sleep',
    ingredients: ['Melatonin', 'Lavender Essential Oil', 'Chamomile Extract', 'Caffeine', 'L-Theanine', 'Vitamin B12'],
    benefits: [
      'Find restful sleep quickly',
      'Supports deep stress relief and calm',
      'Boosts sharp attention & mental clarity',
      'Zero synthetic chemicals, fully plant-based'
    ],
    usage: 'Breathe in through the mouth and exhale through the nose gently. Take 5-10 breaths per session. Do not ingest.'
  },
  {
    id: 'dream-mist',
    name: 'Cloudy Dream Mist',
    tagline: 'Soothing pillow and linen spray with lavender & valerian',
    description: 'Transform your bedroom into a soothing plant-powered sanctuary. Infused with lavender, chamomile, and valerian root extract, this premium spray instantly calms the nervous system and preps your mind for blissful sleep.',
    price: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCVg8rW9Czs5U7FfCvFv6bA3iGYNKwAJpx1rIT5Ytju4RWSBEFSrmG4YjWCS8jWTDpdcjpfouzpLxGcltWuq2vK0T23Jl6797lOOXnCDzkP2ESaeIly2vDcCdBBdES6RBzuqdcuH5mKtAAvYmGFL61C9yJc2WuwU0Rj9bAX1U3O--piVObW-4-smYQBbDrWgffxLxS7hs76_Xt3gjEeX1GJHOpz8DenKyJgjFeS2gwgK0T0nB-lWejCfG6X70wOnj_eiZcBWPwLCZL',
    rating: 4.8,
    reviewsCount: 942,
    category: 'sleep',
    ingredients: ['Lavender Oil', 'Valerian Root Extract', 'Chamomile Flower Extract', 'Witch Hazel', 'Distilled Water'],
    benefits: [
      'Instant calming aroma for your sleep space',
      'Formulated with organic and premium ingredients',
      'Deeply relaxes the mind and relieves evening anxiety',
      'Non-staining and long-lasting formula'
    ],
    usage: 'Mist generously over pillow, bedsheets, and sleeping space 5-10 minutes before bed.'
  },
  {
    id: 'mellows-gummies',
    name: 'Cloudy Mellows Sleep Gummies',
    tagline: 'Relaxing sleep gummies with melatonin & chamomile',
    description: 'Delicious, guilt-free sleep gummies designed to help you drift off effortlessly and wake up feeling entirely refreshed. Formulated with key adaptogens to soothe mind chatter and promote optimal circadian rhythm.',
    price: 20,
    originalPrice: 25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlAuSFg1nYVgIK0CgrBMtV28zL9UeET-htWzdNnhqA47QATQFS62W2t8ggVy39EGXA-MRRPzlt3c-PuF9gMDOHiIiDKQLSio6c0K17vng_6-qFaWD19xTDJrJMGloU0H_jMfcmIUZ0LojnDFlIe5gdHz829namb6LhVxy7uzWqkCfKsP6dSXfdY5Mk9TlFvo0NtlXV9gq1xr1B3G40-EgDOlkrKyCpj_kLjIteievMIA8JCr1L0DFkK6s6ZgOYEMUvegwZitDtKzu5',
    rating: 4.9,
    reviewsCount: 1450,
    category: 'calm',
    ingredients: ['Melatonin 3mg', 'L-Theanine', 'Chamomile Extract', 'Ashwagandha Root', 'Lemon Balm'],
    benefits: [
      'Gently lulls the body into restful slumber',
      'No grogginess or heavy sleep hangover next morning',
      '100% Vegan, gluten-free, made with organic pectin',
      'Scrumptious natural berry flavor'
    ],
    usage: 'Chew 1 to 2 gummies 30 minutes before your planned bedtime.'
  },
  {
    id: 'silk-sleep-mask',
    name: 'Cloudy Premium Silk Sleep Mask',
    tagline: '100% mulberry silk eye mask for total blackout sleep',
    description: 'Treat your eyes to the highest grade 100% mulberry silk. Luxuriously soft, friction-free, and designed to block out all light to stimulate natural melatonin production while remaining gentle on delicate skin.',
    price: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfAJfsC9aK_vMvupmYpvmrHhsuaG2WSaLgaOouLdHIyZ26SuwQMK4ZzYSQ15AYtpFe1dMP1-iYczw9XS-zqcrxkKv_5l7dnBIDEmnb5p3efduXQwQQc5f4IUxl5f811jK18JdTbXzZjwXE4kFEL3eJKzpKUxigv_D_2vN8D49qAL4csX6OvYOhv6_ZdY_jM3F-LTyktlbJnHvVq9ebuN_q9nLLC0Fhtdca-4BMFW4r47_ZVI1qixlpsccJxUifsPu9mMVCIsdICUpv',
    rating: 4.7,
    reviewsCount: 312,
    category: 'accessories',
    ingredients: ['100% Mulberry Silk', 'Breathable Padding', 'Adjustable Elastic Band'],
    benefits: [
      'Blocks 100% of light for deep REM cycles',
      'Hypoallergenic and prevents facial sleep wrinkles',
      'Gentle on eyelashes and skin hydration',
      'Ultra-comfortable, adjustable fit for all head sizes'
    ],
    usage: 'Place over your eyes and adjust the comfortable elastic band for a perfect, gentle fit before sleep.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your primary wellness goal today?',
    options: [
      {
        text: 'Drift off to sleep easily and stay asleep longer',
        points: { sleep: 3, calm: 1 }
      },
      {
        text: 'Soothe general anxiety, mind chatter, and tension',
        points: { calm: 3, sleep: 1 }
      },
      {
        text: 'Boost sharpness, concentration, and beat brain fog',
        points: { focus: 3 }
      }
    ]
  },
  {
    id: 2,
    question: 'How do you usually prefer to integrate wellness into your routine?',
    options: [
      {
        text: 'Inhaling natural aromas (aromatherapy, diffusers, or sprays)',
        points: { sleep: 2, calm: 2 }
      },
      {
        text: 'A delicious, chewable vitamin or herbal gummy',
        points: { calm: 3 }
      },
      {
        text: 'A tactile physical accessory that enhances sensory comfort',
        points: { accessories: 3 }
      }
    ]
  },
  {
    id: 3,
    question: 'At what time of day do you struggle with stress or fatigue the most?',
    options: [
      {
        text: 'Late evening, where my brain just won’t shut off',
        points: { sleep: 3, calm: 2 }
      },
      {
        text: 'Mid-day slump, when I have a hard time maintaining focus',
        points: { focus: 3 }
      },
      {
        text: 'All day long, I just feel tense and need general soothing',
        points: { calm: 3, sleep: 1 }
      }
    ]
  }
];
