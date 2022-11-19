import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

export async function findPaymentByTicket(ticketId: number, userId: number): Promise<Payment> { 
  if(!ticketId) {
    throw requestError(400, "BAD_REQUEST");
  }

  const searchTicket = await ticketsRepository.findTicketById(ticketId);

  if(searchTicket===null) {
    throw notFoundError();
  }

  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(searchTicket.enrollmentId !== userEnrollment.id) {
    throw unauthorizedError();
  }
  
  const payment = await paymentsRepository.findManyTicketType(ticketId);

  return payment;
}

// export async function findTicketByUserId(userId: number): Promise<Ticket> {
//   const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

//   if (!userEnrollment) {
//     throw notFoundError();
//   } 

//   const ticket = await ticketRepository.findTicketByEnrollment(userEnrollment.id);

//   if(!ticket) {
//     throw notFoundError();
//   }
  
//   return ticket;
// }

// export async function createNewTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
//   const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

//   if (userEnrollment===null) {
//     throw notFoundError();
//   } 

//   const newTicket = await ticketRepository.createTicket(ticketTypeId, userEnrollment.id);
    
//   return newTicket;
// }

const paymentsService = {
  findPaymentByTicket
};

export default paymentsService;
