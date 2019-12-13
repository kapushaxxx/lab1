import "reflect-metadata";
import * as express from "express";
import {createConnection} from "typeorm";
import {storeController} from "./controllers/storeController";

createConnection().then(connection => {
    const prodPort = process.env.PORT || 8080;
    const shopApp = express();

    storeController(shopApp, connection);

    shopApp.listen(prodPort);
    console.log('Server has started successfully!');
}).catch(error => console.log(error));
