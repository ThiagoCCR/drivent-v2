import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findPaymentByTicketId } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", findPaymentByTicketId);

export { paymentsRouter };
