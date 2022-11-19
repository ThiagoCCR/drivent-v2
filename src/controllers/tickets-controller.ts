import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

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
  const { ticketTypeId } = req.body;

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const newTicket = await ticketsService.createNewTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

// export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
//   try {
//     await enrollmentsService.createOrUpdateEnrollmentWithAddress({
//       ...req.body,
//       userId: req.userId,
//     });

//     return res.sendStatus(httpStatus.OK);
//   } catch (error) {
//     return res.sendStatus(httpStatus.BAD_REQUEST);
//   }
// }

// export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
//   const { cep } = req.query as Record<string, string>;

//   try {
//     const address = await enrollmentsService.getAddressFromCEP(cep);
//     return res.status(httpStatus.OK).send(address);
//   } catch (error) {
//     if (error.name === "NotFoundError") {
//       return res.send(httpStatus.NO_CONTENT);
//     }
//   }
// }
