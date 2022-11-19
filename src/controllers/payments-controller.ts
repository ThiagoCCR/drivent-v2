import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";
import { number } from "joi";

export async function findPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  
  try {
    const payment = await paymentsService.findPaymentByTicket(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

// export async function findTicket(req: AuthenticatedRequest, res: Response) {
//   const { userId } = req;

//   try {
//     const ticket = await ticketsService.findTicketByUserId(userId);
  
//     return res.status(httpStatus.OK).send(ticket);
//   } catch (error) {
//     return res.sendStatus(httpStatus.NOT_FOUND);
//   }
// }

// export async function createTicket(req: AuthenticatedRequest, res: Response) {
//   const { userId } = req;
//   const { ticketTypeId } = req.body;

//   if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

//   try {
//     const newTicket = await ticketsService.createNewTicket(ticketTypeId, userId);
//     return res.status(httpStatus.CREATED).send(newTicket);
//   } catch (error) {
//     return res.sendStatus(httpStatus.NOT_FOUND);
//   }
// }
