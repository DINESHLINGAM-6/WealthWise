import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and onboarding
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - interests
 *               - goals
 *               - skillLevel
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dinesh
 *               email:
 *                 type: string
 *                 example: dinesh@gmail.com
 *               age:
 *                 type: number
 *                 example: 21
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["coding", "investing"]
 *               goals:
 *                 type: string
 *                 example: I want to become financially free by 30
 *               skillLevel:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Intermediate
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request – error saving user
 */
router.post('/create', async (req, res) => {
  try {
    console.log('📥 Incoming user data:', req.body);
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error('❌ Error saving user:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: number
 *                   interests:
 *                     type: array
 *                     items:
 *                       type: string
 *                   goals:
 *                     type: string
 *                   skillLevel:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Server error – Failed to fetch users
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
