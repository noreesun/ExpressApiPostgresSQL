import Express from "express";
import pool from "../utils/db";

const router = Express.Router();

//ทดสอบการเขื่อต่อ Database postgresql
/**
 * @swagger
 * tags:
 *  name: TestDB
 *  description: Test connection to database
 */

/**
 * @swagger
 *  /api/testdb:
 *   get:
 *    summary: Test connection to database
 *    tags: [TestDB]
 *    responses:
 *      200:
 *          description: Connect to database successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example : Connect to database successfully
 *      500:
 *         description: Database Connection Error
 *
 */

router.get("/testdb", async (req, res) => {
  try {
    const Client = await pool.connect();
    const result = await Client.query("SELECT NOW()");
    Client.release();

    res.status(200).json({
      message: "Connect to database successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error: error,
    });
  }
});

export default router;
