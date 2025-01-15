import Express from "express";

import * as productController from "../controller/productController";
import { authMiddlewareJWT } from './../middlewares/authMiddleware';

const router = Express.Router();

//ทดสอบการเขื่อต่อ Database postgresql
/**
* @swagger
* tags:
*  name: Products
*  description: API for managing products
*/
 
/**
* @swagger
* /api/products:
*   get:
*     summary: Get all products
*     tags: [Products]
*     security:
*      - bearerAuth: []
*     responses:
*       200:
*         description: List of products
*         content:
*           application/json:
*             schema:
*              type: array
*              items:
*               $ref: '#/components/schemas/Product'
*/
router.get("/",authMiddlewareJWT, productController.getAllProducts);

// routes อ่านข้อมูลสินค้าตาม id
/**
* @swagger
* /api/products/{id}:
*   get:
*     summary: Get a product by ID
*     tags: [Products]
*     security:
*      - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     responses:
*       200:
*         description: The product details
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.get("/:id",authMiddlewareJWT, productController.getProductById);

// routes เพิ่มข้อมูลสินค้าใหม่
/**
* @swagger
* /api/products:
*   post:
*     summary: Create a new product
*     tags: [Products]
*     security:
*      - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "iPhone 14"
*               price:
*                 type: number
*                 example: 999.99
*     responses:
*       201:
*         description: Product created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*/
router.post("/",authMiddlewareJWT, productController.addProduct);

// routes แก้ไขข้อมูลสินค้า
/**
* @swagger
* /api/products/{id}:
*   put:
*     summary: Update an existing product
*     tags: [Products]
*     security:
*      - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "iPhone 14 Pro"
*               price:
*                 type: number
*                 example: 1099.99
*     responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.put("/:id",authMiddlewareJWT, productController.updateProduct);

// routes ลบข้อมูลสินค้า
/**
* @swagger
* /api/products/{id}:
*   delete:
*     summary: Delete a product by ID
*     tags: [Products]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     responses:
*       200:
*         description: Product deleted successfully
*       404:
*         description: Product not found
*/
router.delete("/:id",authMiddlewareJWT, productController.deleteProduct);

export default router;

 