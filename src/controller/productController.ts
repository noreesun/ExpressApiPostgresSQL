import { Request, Response } from "express";
//แบบืที่ 1
//import getAllProducts , xxxx  from "../services/productService";

//แบบืที่ 2
import * as productService from "../services/productService";

//แสดงข้อมูลสินค้าทั้งหมด
export const getAllProducts = async (req : Request , res : Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//แสดงข้อมูลสินค้าตาม id
export const getProductById = async (req : Request , res : Response) => {
    try {
        const id = parseInt(req.params.id); //อ่านค่า id จาก url รับค่า parameter จาก url
        const product = await productService.getProductById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//เพิ่มข้อมูลสินค้า สร้าง Function สำหรับเพิ่มข้อมูลสินค้า
export const addProduct = async (req : Request , res : Response) : Promise<void> => {  //รับค่าจาก body
    try {

        //const name = req.body.name;
        //const price = req.body.price;

        //ประกาศตัวแปร แบบลดรูป
        const { name, price } : any = req.body;
        parseFloat(price);

        const product = await productService.addProduct(name, price);
        
        res.status(201).json(product);

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//แก้ไขข้อมูลสินค้า
export const updateProduct = async (req : Request , res : Response) : Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { name, price } : any = req.body;
        parseFloat(price);

        const product = await productService.updateProduct(id, name, price);

        res.status(200).json(product);

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//ลบข้อมูลสินค้า
export const deleteProduct = async (req : Request , res : Response) : Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const product = await productService.deleteProduct(id);

        res.status(200).json(product);

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

