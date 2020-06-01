import { Router } from "express";
import { me, updateMe } from "./user.controllers";

const router = Router();

router
  .route("/me")
  .get(me)
  .put(updateMe);

export default router;
