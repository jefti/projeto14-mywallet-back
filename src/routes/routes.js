import { Router } from 'express';
import { signin, signup, getUsers, getSessions,signout } from '../controllers/userController.js';
import { postTransaction, getTransaction } from '../controllers/transactionController.js';

const router = Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);

router.get("/users",getUsers);
router.get("/sessions",getSessions);

router.post("/transaction", postTransaction);
router.get('/transaction', getTransaction);

router.delete("/sessions", signout);

export default router;