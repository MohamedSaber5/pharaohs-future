import { Router } from "express";
import { getSiteSettings } from "../controllers/admin.controller.js";

const router = Router();

// Public route to get contact info and public site settings
router.get("/", getSiteSettings);

export default router;
