import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

interface RequestBody {
  id?: string;
  title: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN as string,
    });

    const preference = new Preference(client);

    // Define a base URL
    const baseUrl =
      "https://ce1d-2804-14d-6892-4648-94b6-a227-5933-393a.ngrok-free.app";

    const result = await preference.create({
      body: {
        items: [
          {
            id: body.id || "1",
            title: body.title || "Produto Teste",
            quantity: body.quantity || 1,
            unit_price: body.price || 100,
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
      },
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao criar preferência de pagamento" },
      { status: 500 },
    );
  }
}
