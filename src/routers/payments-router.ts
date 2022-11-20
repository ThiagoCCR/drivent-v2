import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findPaymentByTicketId, processPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", findPaymentByTicketId)
  .post("/process", processPayment);

export { paymentsRouter };
