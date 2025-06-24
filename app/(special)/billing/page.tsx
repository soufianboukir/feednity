"use client";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Home() {
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  // Calculate subtotal and total
  useEffect(() => {
    setTotal(1.00);
  }, []);
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: 'USD'
          },
          description: `Farm Market Order`,
        },
      ],
    });
  };
  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const order = await actions.order.get();
      console.log('Payment successful', order);
      
      const payerName = order.payer?.name?.given_name || '';
      const payerEmail = order.payer?.email_address || '';
      
      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: total.toFixed(2),
        orderID: data.orderID
      };
      
      console.log('Sending to API:', paymentData);
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error('Payment processing failed');
      }
      const result = await response.json();
      console.log('API response:', result);
      alert('Payment processed successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      setPaypalError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  const onError = (err: any) => {
    console.error('PayPal error:', err);
    setPaypalError('An error occurred with PayPal. Please try again.');
  };
  return (
    <div className="container mx-auto max-w-md p-4">
        <div className="card bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-2 dark:text-black">Order Summary</h2>
            <p className="text-3xl font-semibold dark:text-black mb-2">Total: <span className="text-blue-600">{total}.00$</span></p>
            {isProcessing && (
            <div className="mb-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
                <span>Processing your payment...</span>
            </div>
            )}
            {paypalError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {paypalError}
            </div>
            )}
            <PayPalScriptProvider options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                currency: 'USD',
                intent: 'capture'
            }}>
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