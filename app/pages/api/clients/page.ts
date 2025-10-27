import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/dbconnection";
import Client from "@/app/database/models/Clients";
import axios from "axios";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { fullName, email, message } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({ ok: false, message: "Full name and email are required." });
      }

      const exists = await Client.findOne({ email });
      if (exists)
        return res.status(400).json({ ok: false, message: "Client already exists." });

  const cryptoWithUuid = crypto as unknown as { randomUUID?: () => string };
  const id = cryptoWithUuid.randomUUID ? cryptoWithUuid.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const newClient = new Client({ id, fullName, email, message });
      await newClient.save();


      const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhook) {
        try {

          await axios.post(webhook, {
            id,
            fullName,
            email,
            message,
            createdAt: newClient.createdAt,
          });
        } catch (err) {
          console.warn("Warning: failed to send to Google Sheets webhook:", (err as Error).message);
        }
      }

      res.status(201).json({ ok: true, data: newClient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Error creating client." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
