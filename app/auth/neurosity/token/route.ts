import { Neurosity } from "@neurosity/sdk";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'

const neurosity = new Neurosity({
    autoSelectDevice: false
});

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params
    return neurosity
        .getOAuthToken({
            clientId: process.env.NEUROSITY_OAUTH_CLIENT_ID!,
            clientSecret: process.env.NEUROSITY_OAUTH_CLIENT_SECRET!,
            userId
        })
        .then((token) => NextResponse.json(token))
        .catch((error) => NextResponse.json({ error: error.response.data }, { status: 400 }))
}