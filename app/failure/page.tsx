"use client";

import Link from "next/link";

export default function Failure() {
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
          {/* Failure Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
            Pagamento Não Aprovado
          </h2>

          <p className="text-center text-gray-600 text-sm mb-4">
            {formatDate()}
          </p>

          {/* Status Info */}
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Recusado
              </span>
            </div>
          </div>

          {/* Common Error Reasons */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Motivos mais comuns:
            </p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-4 text-red-500">•</span>
                <span>Saldo insuficiente</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 text-red-500">•</span>
                <span>Dados do cartão incorretos</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 text-red-500">•</span>
                <span>Limite do cartão excedido</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 text-red-500">•</span>
                <span>Bloqueio por segurança</span>
              </li>
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
            <p className="text-xs text-blue-800">
              <span className="font-medium">Sugestões:</span> Verifique os dados
              informados, tente outro cartão ou entre em contato com seu banco.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href="/"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded text-center"
            >
              Tentar novamente
            </Link>

            <Link
              href="/suporte"
              className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded text-center"
            >
              Falar com suporte
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Se precisar de ajuda, entre em contato com nosso suporte
        </p>
      </div>
    </div>
  );
}
