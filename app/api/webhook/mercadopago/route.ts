import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

/**
 * Extrai ts e v1 do header x-signature
 * Formato esperado:Assinatura inválida
 POST /api/webhook/mercadopago?data.id=146470600523&type=payment 401 in 14ms (compile: 9ms, render: 5ms)
Webhook recebido: {
  topic: 'merchant_order',
  body: {
    resource: 'https://api.mercadolibre.com/merchant_orders/38363197091',
    topic: 'merchant_order'
  }
}
Ignorando merchant_order
 POST /api/webhook/mercadopago?id=38363197091&topic=merchant_order 200 in 14ms (compile: 10ms, render: 4ms)
 * ts=1700000000,v1=abc123hash
 */
function parseSignatureHeader(signature: string) {
  const parts = signature.split(",");
  let ts = "";
  let hash = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key?.trim() === "ts") ts = value?.trim();
    if (key?.trim() === "v1") hash = value?.trim();
  }

  return { ts, hash };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const topic = req.nextUrl.searchParams.get("topic");
    const dataIdFromQuery = req.nextUrl.searchParams.get("id");
    const xSignature = req.headers.get("x-signature");
    const xRequestId = req.headers.get("x-request-id") || "";
    const secret = process.env.MP_WEBHOOK_SECRET!;

    console.log("Webhook recebido:", {
      topic,
      body,
    });

    /**
     * 1️⃣ Ignorar merchant_order
     * Não precisamos dele se estamos tratando payment
     */
    if (topic === "merchant_order") {
      console.log("Ignorando merchant_order");
      return NextResponse.json({ received: true });
    }

    /**
     * 2️⃣ Descobrir ID do pagamento
     */
    const paymentId = body?.data?.id || dataIdFromQuery || body?.id || null;

    if (!paymentId) {
      console.log("Webhook sem paymentId relevante");
      return NextResponse.json({ received: true });
    }

    /**
     * 3️⃣ Validar assinatura (apenas se existir)
     */
    if (xSignature) {
      const { ts, hash } = parseSignatureHeader(xSignature);

      const manifest = `id:${paymentId};request-id:${xRequestId};ts:${ts};`;

      const computed = crypto
        .createHmac("sha256", secret)
        .update(manifest)
        .digest("hex");

      if (computed !== hash) {
        console.error("Assinatura inválida");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 },
        );
      }
    } else {
      console.log("Webhook sem assinatura (modo legacy)");
    }

    /**
     * 4️⃣ Processar apenas eventos de pagamento
     */
    if (body.type === "payment" || topic === "payment") {
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
