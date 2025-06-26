declare namespace NodeJS {
    interface ProcessEnv {
      EMAIL_USER: string;
      EMAIL_PASS: string; 
      NEXT_PUBLIC_APP_URL: string;
      PAYPAL_API_URL: string;
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;
      PAYPAL_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
  