export const KEYCLOAK_PUBLIC_CONFIG = {
  realm: String(process.env.NEXT_PUBLIC_KEYCLOAK_REALM),
  url: String(process.env.NEXT_PUBLIC_KEYCLOAK_URL),
  clientId: String(process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID),
};
