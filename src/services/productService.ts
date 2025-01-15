import pool from "../utils/db";
import Product from "../models/productModel";

interface IProduct {
    id: number;
    name: string;
    price: number;
}

//อ่านข้อมูลสินค้าทั้งหมด
export const getAllProducts = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM products");
        client.release();

        return result.rows.map(row => new Product(
            row.id, 
            row.name, 
            row.price));

    } catch (error) {
        throw error;
    }
}

//อ่านข้อมูลสินค้าตาม id
export const getProductById = async (id: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM products WHERE id = $1", [id]);
        client.release();

        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Product(row.id, row.name, row.price);
        } else {
            return null;
        }

    } catch (error) {
        throw error;
    }
}

//เพิ่มข้อมูลสินค้า
export const addProduct = async (name:string , price:number,) : Promise<IProduct> => {
    try {
        const client = await pool.connect();
        const result = await client.query("INSERT INTO products(name, price) VALUES($1, $2) RETURNING *", [name,price]);
        client.release();

        return new Product(
            result.rows[0].id,
            result.rows[0].name,
            result.rows[0].price);

    } catch (error) {
        throw error;
    }
}

//update ข้อมูลสินค้า
export const updateProduct = async (id: number, name: string, price: number) : Promise<IProduct> => {
    try {
        const client = await pool.connect();
        const result = await client.query("UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *", [name, price, id]);
        client.release();

        if (result.rows.length > 0) {
            return new Product(
                result.rows[0].id,
                result.rows[0].name,
                result.rows[0].price);
        } else {
            throw new Error(`product with id ${id} not found`); 
        }

    } catch (error) {
        throw new Error(`product with id ${id} not found`);
    }
}

//delete ข้อมูลสินค้า
export const deleteProduct = async (id: number) : Promise<IProduct> => {   
    try {
        const client = await pool.connect();
        const result = await client.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
        client.release();

        if (result.rows.length > 0) {
            return new Product(
                result.rows[0].id,
                result.rows[0].name,
                result.rows[0].price);
        } else {
            throw new Error(`product with id ${id} not found`);
        }

    } catch (error) {
        throw new Error(`product with id ${id} not found`);
    }
}
