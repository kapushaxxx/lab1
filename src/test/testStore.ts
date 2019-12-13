import { createConnection } from "typeorm";
import * as express from "express";
import {storeController} from "../controllers/storeController";
import * as request from "supertest";

const app = express();

describe('Rouiting tests', () => {
    before((done) => {
        createConnection().then(connection => {
            storeController(app, connection);
            app.listen(process.env.TEST_PORT);
            done();
        });
    });

    it ('invalid rout', (done) => {
        request(app)
            .get("/pushka")
            .expect(404)
            .end(done);
    });

    it ('valid response status', (done) => {
        request(app)
            .get("/")
            .expect(200)
            .end(done);
    });

    it ('product deleted', (done) => {
        request(app)
            .delete("/product/1")
            .expect(200)
            .end(done);
    });

    it ('product changed', (done) => {
        request(app)
            .put("/product/2")
            .query({"dd": 2}).expect(200)
            .end(done);
    });

    it ('product added', (done) => {
        request(app)
            .post("/product")
            .send({"name": "sssss", "type": "dssfsdf", price: 222}).expect(200)
            .end(done);
    });
});
