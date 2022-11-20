import { prisma } from "@/config";
import { Payment } from "@prisma/client";
import { processPaymentBody } from "@/protocols";

async function findPaymentData(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function createPayment(ticketData: processPaymentBody): Promise<Payment> {
  return await prisma.payment.create({
    data: {
      ticketId: ticketData.ticketId,
      cardIssuer: ticketData.cardData.issuer,
      value: ticketData.price,
      cardLastDigits: ticketData.cardLastDigits
    }
  });
}

const paymentsRepository = {
  findPaymentData,
  createPayment
};

export default paymentsRepository;
