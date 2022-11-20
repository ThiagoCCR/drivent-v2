import { prisma } from "@/config";
import { TicketType, Ticket, TicketStatus } from "@prisma/client";

async function findManyTicketType(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: { id: ticketId }
  });
}

async function findTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({
    where: { id: ticketTypeId }
  });
}

async function findTicketByEnrollment(enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function updateTicketAsPaid(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  findManyTicketType,
  findTicketByEnrollment,
  createTicket,
  findTicketById,
  findTicketTypeById,
  updateTicketAsPaid
};

export default ticketRepository;
