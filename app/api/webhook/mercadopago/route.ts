import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const topic = req.nextUrl.searchParams.get("topic");
    const dataIdFromQuery = req.nextUrl.searchParams.get("id");

    if (body.type === "payment" || topic === "payment") {
      const paymentId = body?.data?.id || dataIdFromQuery || body?.id || null;
      console.log("Buscando pagamento:", paymentId);

      const payment = await new Payment(client).get({
        id: String(paymentId),
      });

      console.log("Status do pagamento:", payment.status);

      if (payment.status === "approved") {
        console.log("Pagamento aprovado:", payment.id);

        /**
         * 🔥 IMPORTANTE: lógica idempotente
         * Antes de atualizar o pedido:
         * - verificar se já está marcado como pago
         * - evitar duplicidade
         */

        // await updateOrderIfNotPaid(payment.id);
      }
    }

    /**
     * Sempre retornar 200 para evitar retry infinito
     */
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);

    // Mesmo em erro, idealmente retornar 200
    // para evitar loops infinitos de retry
    return NextResponse.json({ received: true });
  }
}
