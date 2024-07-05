import { z } from 'zod';

export const envValidator = z.object({
  STATIC_FILES_URI: z.string().url(),
  IDP_JWKS_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_REFRESH_SECRET_KEY: z.string(),
  APP_PORT: z.number({ coerce: true }).default(4000),
  SVC_USER: z.string(),
  SVC_AGENCY: z.string(),
});

export type Env = z.infer<typeof envValidator>;
