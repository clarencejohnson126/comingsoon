export type Language = 'en' | 'de';

export interface Translations {
  header: {
    slogan1: string;
    slogan2: string;
    waitlist: string;
    contact: string;
  };
  hero: {
    typewriterText: string;
    countdownText: string;
    blacklistButton: string;
    emailPlaceholder: string;
    joinButton: string;
    cancel: string;
    successMessage: string;
    errorMessage: string;
  };
  matrix: {
    title: string;
  };
  productPreview: {
    title: string;
    subtitle: string;
    reserveButton: string;
    exclusive: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      slogan1: 'Rep your TechStack',
      slogan2: 'Merch for Coders with AI & Guts',
      waitlist: 'Blacklist',
      contact: 'Contact'
    },
    hero: {
      typewriterText: "Deploy Yourself. Don't Obey. Join the Movement.",
      countdownText: 'Blacklist closes in:',
      blacklistButton: 'Get Blacklisted',
      emailPlaceholder: 'Enter your email...',
      joinButton: 'Join Blacklist',
      cancel: 'Cancel',
      successMessage: 'Welcome to the Rebelz AI Underground! 🔥',
      errorMessage: 'Something went wrong. Try again.'
    },
    matrix: {
      title: 'The Rebelz AI Mindset'
    },
    productPreview: {
      title: 'PRODUCT PREVIEW',
      subtitle: "Sneak peek at what's compiling in our design lab",
      reserveButton: 'Reserve This Drop',
      exclusive: 'EXCLUSIVE'
    },
    features: {
      title: 'Join the Rebelz AI Underground',
      subtitle: 'Early-bird Access'
    }
  },
  de: {
    header: {
      slogan1: 'Rep deinen TechStack',
      slogan2: 'Die einzige Marke, die Code & Kleidung vereint.',
      waitlist: 'Blacklist',
      contact: 'Kontakt'
    },
    hero: {
      typewriterText: "Implementiere dich selbst. Gehorche niemanden. Schließe dich der Bewegung an.",
      countdownText: 'Blacklist schließt in:',
      blacklistButton: 'Auf Blacklist setzen',
      emailPlaceholder: 'E-Mail eingeben...',
      joinButton: 'Blacklist beitreten',
      cancel: 'Abbrechen',
      successMessage: 'Willkommen im Rebelz AI Underground! 🔥',
      errorMessage: 'Etwas ist schief gelaufen. Versuche es erneut.'
    },
    matrix: {
      title: 'Das Rebelz AI Mindset'
    },
    productPreview: {
      title: 'PRODUKT VORSCHAU',
      subtitle: 'Erster Blick auf das, was in unserem Design Lab entsteht',
      reserveButton: 'Diesen Drop reservieren',
      exclusive: 'EXKLUSIV'
    },
    features: {
      title: 'Tritt dem Rebelz AI Underground bei',
      subtitle: 'Frühzeitiger Zugang'
    }
  }
};

export const useTranslation = (language: Language) => {
  return translations[language];
};