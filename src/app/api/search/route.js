// src/app/api/search/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.trim() || '';

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabase
    .from('entries')
    .select('id, title, category')
    .ilike('title', `%${query}%`)
    .or(`content.ilike.%${query}%,category.ilike.%${query}%`)
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}