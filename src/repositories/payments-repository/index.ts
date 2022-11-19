import { prisma } from "@/config";
import { TicketType, Ticket, Payment } from "@prisma/client";

async function findManyTicketType(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId }
  });
}

// async function findTicketByEnrollment(enrollmentId: number): Promise<Ticket> {
//   return await prisma.ticket.findFirst({
//     where: { enrollmentId },
//     include: {
//       TicketType: true,
//     },
//   });
// }

// async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
//   return await prisma.ticket.create({
//     data: {
//       status: "RESERVED",
//       ticketTypeId: ticketTypeId,
//       enrollmentId: enrollmentId,
//     },
//     include: {
//       TicketType: true,
//     }
//   });
// }

const paymentsRepository = {
  findManyTicketType
};

export default paymentsRepository;
