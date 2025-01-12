import { productRoute } from '../middlewares/productRoute.js';
import { authRoute } from '../middlewares/authRoute.js';
import  * as productController from '../controllers/product-controller.js';
import  * as s3Controller from '../controllers/s3-controller.js';
import express from 'express';
const router = express.Router();
import multer from "multer"
const upload = multer({ dest: "uploads/" });
import StatsD from 'statsd-client';

const client = new StatsD();
// get Product Route
router.get('/:id', async (req, res)=> {
    client.increment("GetProduct", 1);
        productController.getProduct(req, res);
});

// Create Product with put Route
router.post('/', async (req, res)=> {
    client.increment("PostProduct", 1);
    const status = await authRoute(req, res);
    if(status === 200)
        productController.createProduct(req, res);
    else
        res.status(status).send("");
});

// Update Product with put Route
router.put('/:id', async (req, res)=> {
    client.increment("PutProduct", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        productController.putProduct(req, res);
    else
        res.status(status).send("");
});

// Update Product with patch Route
router.patch('/:id', async (req, res)=> {
    client.increment("PatchProduct", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        productController.patchProduct(req, res);
    else
        res.status(status).send("");
});

// delete Product Route
router.delete('/:id', async (req, res)=> {
    client.increment("DeleteProduct", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        productController.deleteProduct(req, res);
    else
        res.status(status).send("");
});

// get All Images Route
router.get('/:id/image', async (req, res)=> {
    client.increment("GetAllImages", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        s3Controller.getAllImages(req, res);
    else
        res.status(status).send("");
});

// get a single Image Route
router.get('/:id/image/:imageId', async (req, res)=> {
    client.increment("GetImage", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        s3Controller.getImage(req, res);
    else
        res.status(status).send("");
});

// Create Image with post Route
router.post('/:id/image',upload.single('file'), async (req, res)=> {
    client.increment("PostImage", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        s3Controller.uploadImage(req, res);
    else
        res.status(status).send("");
});

// delete Image Route
router.delete('/:id/image/:imageId', async (req, res)=> {
    client.increment("DeleteImage", 1)
    const status = await productRoute(req, res);
    if(status === 200)
        s3Controller.deleteImage(req, res);
    else
        res.status(status).send("");
});



export default router;