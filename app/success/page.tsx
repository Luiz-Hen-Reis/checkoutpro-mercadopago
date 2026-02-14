"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const paymentType = searchParams.get("payment_type");
  const externalReference = searchParams.get("external_reference");

  const formatPaymentType = (type: string | null) => {
    if (!type) return "";
    const types: { [key: string]: string } = {
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
      pix: "PIX",
      boleto: "Boleto",
      account_money: "Saldo Mercado Pago",
    };
    return types[type] || type;
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mercado Pago</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
            Pagamento Confirmado
          </h2>

          <p className="text-center text-gray-600 text-sm mb-6">
            {formatDate()}
          </p>

          {/* Payment Details */}
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                {status === "approved" ? "Aprovado" : status}
              </span>
            </div>

            {paymentId && (
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Código:</span>
                <span className="text-sm font-mono text-gray-800">
                  {paymentId.slice(-8)}
                </span>
              </div>
            )}

            {paymentType && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pagamento:</span>
                <span className="text-sm text-gray-800">
                  {formatPaymentType(paymentType)}
                </span>
              </div>
            )}
          </div>

          {/* External Reference */}
          {externalReference && (
            <div className="mb-6 text-sm text-center text-gray-500">
              Pedido:{" "}
              <span className="font-medium text-gray-700">
                {externalReference}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href="/"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded text-center"
            >
              Voltar ao início
            </Link>

            <button
              onClick={() => window.print()}
              className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded text-center"
            >
              Imprimir comprovante
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Comprovante de pagamento Mercado Pago
        </p>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-2">Carregando...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
