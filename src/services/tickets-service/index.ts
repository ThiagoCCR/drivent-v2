import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketType, Ticket } from "@prisma/client";
import ticketRepository from "@/repositories/tickets-repository";

export async function findTicketTypes(): Promise<TicketType[]> {
  const types = await ticketRepository.findManyTicketType();
  return types;
}

export async function findTicketByUserId(userId: number): Promise<Ticket> {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!userEnrollment) {
    throw notFoundError();
  } 

  const ticket = await ticketRepository.findTicketByEnrollment(userEnrollment.id);

  if(!ticket) {
    throw notFoundError();
  }
  
  return ticket;
}

export async function createNewTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (userEnrollment===null) {
    throw notFoundError();
  } 

  const newTicket = await ticketRepository.createTicket(ticketTypeId, userEnrollment.id);
    
  return newTicket;
}

const ticketsService = {
  findTicketTypes,
  findTicketByUserId,
  createNewTicket
};

export default ticketsService;
