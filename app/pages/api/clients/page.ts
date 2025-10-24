import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/dbconnection";
import Client from "@/app/database/models/Clients";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { fullName, email, message } = req.body;

      if (!fullName || !email) {
        return res
          .status(400)
          .json({ ok: false, message: "Full name and email are required." });
      }

      const exists = await Client.findOne({ email });
      if (exists)
        return res
          .status(400)
          .json({ ok: false, message: "Client already exists." });

      const newClient = new Client({ fullName, email, message });
      await newClient.save();
      res.status(201).json({ ok: true, data: newClient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Error creating client." });
    }
  }
}
