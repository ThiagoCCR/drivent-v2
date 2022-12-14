import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { number } from "joi";

export async function findTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.findTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function findTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.findTicketByUserId(userId);
  
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;

  try {
    const newTicket = await ticketsService.createNewTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    return res.sendStatus(httpStatus.NOT_FOUND).send(error);
  }
}

