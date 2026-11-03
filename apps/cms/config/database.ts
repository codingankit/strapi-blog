export default ({ env }) => {
  const isProd = env("NODE_ENV") === "production";

  // TLS on by default in production, off locally (plain local Postgres has no SSL).
  // Certificate verification stays ON unless you explicitly turn it off
  // (e.g. a provider with a private CA): DATABASE_SSL_REJECT_UNAUTHORIZED=false
  const useSsl = env.bool("DATABASE_SSL", isProd);

  return {
    connection: {
      client: "postgres",
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: useSsl
          ? {
              rejectUnauthorized: env.bool(
                "DATABASE_SSL_REJECT_UNAUTHORIZED",
                true,
              ),
            }
          : false,
      },
    },
  };
};
