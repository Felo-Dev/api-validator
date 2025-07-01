import { Router } from "express";
import * as productsCtl from "../controllers/products.controllers.js";
import { autJwt } from '../middlewares/index.js';

const router = Router();

router.post(
  '/',
  [autJwt.verifyToken, autJwt.isModerator],
  productsCtl.createProducts
);

router.get(
  '/',
  productsCtl.getProducts
);

router.get(
  '/:productId',
  productsCtl.getProductById
);

router.put(
  '/:productId',
  [autJwt.verifyToken, autJwt.isAdmin],
  productsCtl.updateProduct
);

router.delete(
  '/:productId',
  [autJwt.verifyToken, autJwt.isAdmin],
  productsCtl.deleteProduct
);

export default router;