"use client";

import Link from "next/link";

export default function Pending() {
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
          {/* Pending Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
            Pagamento Pendente
          </h2>

          <p className="text-center text-gray-600 text-sm mb-6">
            {formatDate()}
          </p>

          {/* Status Info */}
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                Pendente
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Processamento:</span>
              <span className="text-sm text-gray-800">Até 48 horas</span>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Atenção:</span> O pagamento será
              confirmado após a aprovação da instituição financeira. Você
              receberá uma notificação quando for processado.
            </p>
          </div>

          {/* Instructions based on payment method */}
          <div className="mb-4 text-sm text-gray-600">
            <p className="font-medium text-gray-700 mb-2">O que fazer agora:</p>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start">
                <span className="inline-block w-4 text-yellow-500">•</span>
                <span>Boleto: Pode levar até 3 dias úteis para compensar</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 text-yellow-500">•</span>
                <span>PIX: Geralmente confirmado em poucos minutos</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 text-yellow-500">•</span>
                <span>Cartão: Aprovação imediata na maioria dos casos</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href="/"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded text-center"
            >
              Voltar ao início
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded text-center"
            >
              Verificar novamente
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Acompanhe o status do pagamento no seu email ou no Mercado Pago
        </p>
      </div>
    </div>
  );
}
