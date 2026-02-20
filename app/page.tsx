"use client";

import { useState } from "react";

interface Product {
  title: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const product: Product = {
    title: "Produto de Exemplo",
    price: 5,
    quantity: 1,
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          quantity: product.quantity,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Erro ao criar checkout");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  const total = product.price * product.quantity;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout Mercado Pago
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {/* Product Details */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Quantidade: {product.quantity}{" "}
                  {product.quantity === 1 ? "unidade" : "unidades"}
                </p>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-md p-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-700">
                  Total a pagar
                </span>
                <span className="text-xl font-bold text-gray-900">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`
                w-full py-3 px-4 rounded-md font-medium text-white
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {loading ? "Processando..." : "Pagar com Mercado Pago"}
            </button>

            {/* Payment Methods */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <span className="text-xs text-gray-400">Visa</span>
              <span className="text-xs text-gray-400">Mastercard</span>
              <span className="text-xs text-gray-400">PIX</span>
              <span className="text-xs text-gray-400">Boleto</span>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>🔒 Pagamento 100% seguro via Mercado Pago</p>
        </div>
      </div>
    </div>
  );
}
