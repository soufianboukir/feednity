"use client";

import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setTotal(3.0);
  }, []);

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (
    data,
    actions
  ) => {
    return actions.order.create({
      intent: "CAPTURE", // Required
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
          description: "Farm Market Order",
        },
      ],
    });
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
    data,
    actions
  ) => {
    setIsProcessing(true);
    try {
      const order = await actions?.order?.get();

      const payerName = order?.payer?.name?.given_name || "";
      const payerEmail = order?.payer?.email_address || "";

      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: total.toFixed(2),
        orderID: data.orderID,
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment processing failed");
      }

      setSuccess("Payment processed successfully!");
    } catch {
      setPaypalError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onError: PayPalButtonsComponentProps["onError"] = () => {
    setPaypalError("An error occurred with PayPal. Please try again.");
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="card bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2 dark:text-black">Order Summary</h2>
        <p className="text-3xl font-semibold dark:text-black mb-2">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </p>

        {isProcessing && (
          <div className="mb-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
            <span>Processing your payment...</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            {success}
          </div>
        )}

        {paypalError && !success && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {paypalError}
          </div>
        )}

        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "USD",
            intent: "capture",
          }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: "vertical" }}
            disabled={isProcessing}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
