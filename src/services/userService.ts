import pool from "../utils/db";
import User from './../models/userModel';

// Type definition for User
interface IUser {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    tel : string;
}

// Function to create new register
export const registerUser = async (
    username: string, 
    password: string, 
    fullname: string, 
    email: string, 
    tel: string
): Promise<IUser> => {
    try {
        const client = await pool.connect();
        const result = await client.query("INSERT INTO users(username, password, fullname, email, tel) VALUES($1, $2, $3, $4, $5) RETURNING *", [username, password, fullname, email, tel]);
        client.release();

        return new User( //Model User
            result.rows[0].id,
            result.rows[0].username,
            result.rows[0].password,
            result.rows[0].fullname,
            result.rows[0].email,
            result.rows[0].tel);

    } catch (error) {
        throw error;
    }
}

// Function User Login
export const loginUser = async (username: string): Promise<IUser | null> => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
        client.release();

        if (result.rows.length > 0) {
            const { id,username,password,fullname,email,tel } = result.rows[0]
            return new User(
                id,
                username,
                password,
                fullname,
                email,
                tel);
        } else {
            throw new Error("User not found");
        }

    } catch (error) {
        throw error;
    }
}
