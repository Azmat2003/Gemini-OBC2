import {Router} from 'express';

import { AskQuestion } from '../controllers/chatControlles.js';

// /api/chat
const router = Router();

// domain/api/chat/ask
router.post('/ask', AskQuestion);

export default router;
