import { App } from 'App';

const app: App = new App();
const port: number = 3000;
const server = app.app;

server.listen(3000, () => {
    console.log(`Listening on port ${port}`);
})