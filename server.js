const initApp = require("./app");

initApp().then((app) => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
  });
});
