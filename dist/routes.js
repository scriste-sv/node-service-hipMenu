"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.get('/', (res) => {
            res.status(200).send({
                Message: 'Succesfull GET!'
            });
        });
        app.get('/meniu/:id', (req, res) => {
            res.send({
                Id: req.params.id
            });
        });
        app.post('/', (req, res) => {
            res.send({
                Message: req.body
            });
        });
        app.put('/meniu/:id', (req, res) => {
            return res.send({
                Id: req.params.id,
                Message: req.body
            });
        });
        app.delete('/meniu/:id', (req, res) => {
            res.send({
                Id: req.params.id
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map