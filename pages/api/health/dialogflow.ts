import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    NEXT_PUBLIC_DIALOGFLOW_AGENT_ID: process.env.NEXT_PUBLIC_DIALOGFLOW_AGENT_ID ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? "local",
  });
}
