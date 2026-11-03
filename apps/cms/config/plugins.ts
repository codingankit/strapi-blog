export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("STORAGE_PUBLIC_ACCESS_URL"),
        s3Options: {
          credentials: {
            accessKeyId: env("STORAGE_ACCESS_KEY_ID"),
            secretAccessKey: env("STORAGE_SECRET_ACCESS_KEY"),
          },
          region: env("STORAGE_REGION"),
          endpoint: env("STORAGE_ENDPOINT"),
          forcePathStyle: env.bool("STORAGE_FORCE_PATH_STYLE", false),
          params: {
            Bucket: env("STORAGE_BUCKET"),
          },
        },
      },
      sizeLimit: 20 * 1024 * 1024,
      security: {
        allowedTypes: ["image/jpeg", "image/png", "image/webp"],
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM"),
        defaultReplyTo: env("DEFAULT_REPLY_TO"),
      },
    },
  },
});
