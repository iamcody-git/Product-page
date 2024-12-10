import express from "express";

import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../Controller/productController.js";

const router = express.Router();

router.post("/", postProduct);

router.delete("/:id", deleteProduct);

router.get("/", getProduct);

router.put("/:id", putProduct);

export default router;
