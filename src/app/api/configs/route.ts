import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSavedConfigs, saveNewConfig, deleteExistingConfig } from '@/lib/config-storage';

export async function GET() {
  try {
    const configs = await getSavedConfigs();
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Failed to get configs:", error);
    return NextResponse.json({ message: 'Failed to retrieve configurations.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, config } = await request.json();
    if (!name || !config) {
      return NextResponse.json({ message: 'Missing name or config in request body.' }, { status: 400 });
    }
    const newConfig = await saveNewConfig(name, config);
    return NextResponse.json(newConfig, { status: 201 });
  } catch (error) {
    console.error("Failed to save config:", error);
    return NextResponse.json({ message: 'Failed to save configuration.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing id query parameter.' }, { status: 400 });
    }

    const result = await deleteExistingConfig(id);
    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Configuration not found.' }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to delete config:", error);
    return NextResponse.json({ message: 'Failed to delete configuration.' }, { status: 500 });
  }
}
