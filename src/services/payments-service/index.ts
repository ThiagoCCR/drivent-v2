import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { processPaymentBody } from "@/protocols";
import ticketRepository from "@/repositories/tickets-repository";

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
  
  const payment = await paymentsRepository.findPaymentData(ticketId);

  return payment;
}

export async function processPayment(ticketData: processPaymentBody, userId: number): Promise<Payment> {
  if (!ticketData.cardData || !ticketData.ticketId) {
    throw requestError(400, "BAD_REQUEST");
  } 
  const ticket = await ticketRepository.findTicketById(ticketData.ticketId);

  if(!ticket) {
    throw notFoundError();
  }

  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(ticket.enrollmentId !== userEnrollment.id) {
    throw unauthorizedError();
  }

  const ticketType =  await ticketRepository.findTicketTypeById(ticket.ticketTypeId);

  ticketData.price = ticketType.price;

  ticketData.cardLastDigits = String(ticketData.cardData.number).slice(-4);

  const proceessedPayment = await paymentsRepository.createPayment(ticketData);
  
  await ticketRepository.updateTicketAsPaid(ticket.id);

  return proceessedPayment;
}

const paymentsService = {
  findPaymentByTicket,
  processPayment
};

export default paymentsService;
