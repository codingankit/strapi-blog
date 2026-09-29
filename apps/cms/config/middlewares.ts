export default ({ env }) => {
  const isProd = env("NODE_ENV") === "production";

  const storageUrl = new URL(env("STORAGE_PUBLIC_ACCESS_URL"));
  const storageHost = storageUrl.host;

  return [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:", isProd ? "" : "http:"].filter(
              Boolean,
            ),
            "img-src": [
              "'self'",
              "data:",
              "blob:",
              "market-assets.strapi.io",
              storageHost,
            ],
            "media-src": [
              "'self'",
              "data:",
              "blob:",
              "market-assets.strapi.io",
              storageHost,
            ],
            "frame-ancestors": ["'self'"],
            upgradeInsecureRequests: isProd ? [] : null,
          },
        },
      },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    {
      name: "strapi::body",
      config: {
        formLimit: "20mb",
        formidable: {
          maxFileSize: 20 * 1024 * 1024,
        },
      },
    },
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    { resolve: "./src/middlewares/root-redirect" },
  ];
};
