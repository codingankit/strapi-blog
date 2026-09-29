export default () => {
  return async (ctx, next) => {
    if (ctx.path === "/") {
      ctx.redirect("/api/health");
      return;
    }
    await next();
  };
};
