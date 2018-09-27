"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = new app_1.App();
const port = 3000;
const server = app.app;
server.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map