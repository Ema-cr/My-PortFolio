import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbconnection';
import Client from '@/app/database/models/Clients';

interface ClientBody {
  fullName: string;
  email: string;
  message?: string;
}

interface GoogleServiceAccount {
  client_email: string;
  private_key: string;
}
export async function POST(req: Request) {
  await dbConnect();

  try {
    const body: ClientBody = await req.json();
    const { fullName, email, message } = body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, message: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    if (typeof fullName !== 'string' || fullName.trim().length < 4) {
      return NextResponse.json(
        { ok: false, message: 'Full name must be at least 4 characters.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const exists = await Client.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { ok: false, message: 'Client already exists.' },
        { status: 400 }
      );
    }
    const id = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const newClient = new Client({ id, fullName, email, message });
    await newClient.save();
    const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const sheetId = process.env.GOOGLE_SHEETS_ID;

    if (saKey && sheetId) {
      try {
        const { google } = await import('googleapis');

        let keyJson: GoogleServiceAccount;
        try {
          keyJson = JSON.parse(saKey) as GoogleServiceAccount;
        } catch {
          keyJson = JSON.parse(
            Buffer.from(saKey, 'base64').toString('utf8')
          ) as GoogleServiceAccount;
        }
        const jwtClient = new google.auth.JWT({
          email: keyJson.client_email,
          key: keyJson.private_key,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        await jwtClient.authorize();
       
        const sheets = google.sheets({ version: 'v4', auth: jwtClient });
       
        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Clients', 
          valueInputOption: 'RAW',
          requestBody: {
            values: [
              [new Date().toISOString(), id, fullName, email, message || ''],
            ],
          },
        });
      } catch (err) {
        console.error('Error enviando a Google Sheets:', err);
      }
    }

    return NextResponse.json({ ok: true, data: newClient }, { status: 201 });
  } catch (err) {
    console.error('Error en /api/clients:', err);
    return NextResponse.json(
      { ok: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
