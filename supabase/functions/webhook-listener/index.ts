
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  email?: string;
  consent?: boolean;
  timestamp?: string;
  source?: string;
  userInfo?: {
    gender: string;
    ageCategory: string;
  };
  questionnaireAnswers?: string[];
  testResults?: {
    leftEarScore: number;
    rightEarScore: number;
    averageScore: number;
  };
  [key: string]: any; // Allow additional properties
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    console.log('Webhook received:', {
      method: req.method,
      timestamp: new Date().toISOString(),
      payload: payload
    });

    // Process the webhook data here
    if (payload.email && payload.source === 'hearing_test_app') {
      console.log('Processing hearing test data:', {
        email: payload.email,
        consent: payload.consent,
        userInfo: payload.userInfo,
        testResults: payload.testResults,
        questionnaireAnswers: payload.questionnaireAnswers?.length || 0
      });

      // You can add your custom processing logic here
      // For example: save to database, send emails, trigger other actions, etc.
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully',
        receivedAt: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
