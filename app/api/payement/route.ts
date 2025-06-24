import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '@/models/user.model';
interface PaymentData {
  name: string;
  email: string;
  amount: string;
  orderID: string;
}
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
}
async function capturePayPalOrder(orderID: string, accessToken: string) {
    try {
      const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}
export async function POST(request: Request) {
    try {
      const session = await getServerSession(authOptions)
      if(!session){
        return NextResponse.json({
          message: 'Unauthorized',
          status: 401
        })
      }

      const user = await User.findOne({_id: session.user.id})
      if(!user){
        return NextResponse.json({
          message: 'User not found',
          status: 404
        })
      }

      const data: PaymentData = await request.json();
      if (!data.name || !data.email || !data.amount || !data.orderID) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
      const accessToken = await getPayPalAccessToken();
      const captureData = await capturePayPalOrder(data.orderID, accessToken);
      if (captureData.status !== 'COMPLETED') {
        return NextResponse.json(
          { error: `Payment capture failed with status: ${captureData.status}` },
          { status: 400 }
        );
      }

      user.plan = 'pro';
      await user.save()

      return NextResponse.json(
        { 
          success: true,
          message: 'Payment captured successfully',
          data: {
            name: data.name,
            email: data.email,
            amount: data.amount,
            orderID: data.orderID,
            captureID: captureData.id,
            captureStatus: captureData.status
          }
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Payment processing error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
}
export async function GET() {
    return NextResponse.json(
      { message: 'Payment API endpoint' },
      { status: 200 }
    );
}