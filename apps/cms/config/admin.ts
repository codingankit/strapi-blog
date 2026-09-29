export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    sessions: {
      maxSessionLifespan: env.int("ADMIN_SESSION_LIFESPAN", 1000 * 60 * 30),
      maxRefreshTokenLifespan: env.int(
        "ADMIN_REFRESH_LIFESPAN",
        1000 * 60 * 60 * 24 * 7
      ),
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  url: "/admin",
});
