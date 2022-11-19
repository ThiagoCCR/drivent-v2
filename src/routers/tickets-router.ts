import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findTicketTypes, findTicket, createTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", findTicketTypes)
  .get("/", findTicket)
  .post("/", createTicket);

export { ticketsRouter };
