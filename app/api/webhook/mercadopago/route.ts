import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const xSignature = req.headers.get("x-signature") || "";
    const xRequestId = req.headers.get("x-request-id") || "";
    const secret = process.env.MP_WEBHOOK_SECRET!;

    // -----------------------
    // VALIDAR ASSINATURA
    // -----------------------
    const dataId = body.data?.id;
    const parts = xSignature.split(",");
    let ts = "";
    let hash = "";

    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key.trim() === "ts") ts = value;
      if (key.trim() === "v1") hash = value;
    });

    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto
      .createHmac("sha256", secret)
      .update(manifest)
      .digest("hex");

    if (hmac !== hash) {
      console.error("Assinatura inválida");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // -----------------------
    // PROCESSAR PAGAMENTO
    // -----------------------
    if (body.type === "payment") {
      const paymentId = body.data.id;

      const payment = await new Payment(client).get({
        id: paymentId,
      });

      if (payment.status === "approved") {
        console.log("Pagamento aprovado:", payment.id);

        // 🔥 Atualizar pedido no banco aqui
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
