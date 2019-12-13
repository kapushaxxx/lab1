import {
    Request,
    Response
} from "express";
import * as bodyParser from  "body-parser";
import {CosmeticStore} from "../entity/CosmeticStore";

const storeController = (shopApp, connection) => {
    const store = connection.getRepository(CosmeticStore);
    shopApp.use(bodyParser.json());

    shopApp.get("/", (req, res) => {
        res.send('Welcome to Cosmetic Store! (c) Pushka')
    });

    shopApp.put("/product/:id", async (req: Request, res: Response) => {
        const product = await store.findOne(req.params.id);

        store.merge(product, req.body);

        return res.send(await store.save(product));
    });

    shopApp.get("/products", async (req: Request, res: Response) => {
        res.json(await store.find());
    });

    shopApp.delete("/product/:id", async (req: Request, res: Response) => {
        return res.send(await store.delete(req.params.id));
    });

    shopApp.get("/product/:id", async (req: Request, res: Response) => {
        return res.send(await store.findOne(req.params.id));
    });

    shopApp.post("/product", async (req: Request, res: Response) => {
        const user = await store.create(req.body);

        return res.send(await store.save(user));
    });

};

export {storeController};