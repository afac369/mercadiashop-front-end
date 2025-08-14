// pages/api/dialogflow-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Recomendado: protege el webhook con un header secreto.
const EXPECTED_SECRET = process.env.DIALOGFLOW_WEBHOOK_SECRET;

type DFRequest = {
  queryResult?: {
    queryText?: string;
    intent?: { displayName?: string };
    parameters?: Record<string, any>;
  };
  session?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Verifica header secreto si lo configuraste
  if (EXPECTED_SECRET) {
    const got = req.headers["x-dialogflow-secret"];
    if (got !== EXPECTED_SECRET) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  const body = req.body as DFRequest;
  const intent = body.queryResult?.intent?.displayName ?? "";
  const q = (body.queryResult?.parameters?.producto || body.queryResult?.queryText || "").toString();

  try {
    if (intent === "BuscarProducto" || intent === "RecomendacionProducto") {
      const { data: products, error } = await supabase
        .from("productos")
        .select("id,name,price,category,description,image_url")
        .eq("is_active", true)
        .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
        .limit(5);

      if (error) throw error;

      if (!products || products.length === 0) {
        return res.status(200).json({
          fulfillmentText: `No encontré resultados para "${q}". ¿Te interesan teclados, mouses o audífonos?`,
          source: "mercadiashop",
        });
      }

      const listado = products
        .map(p => `• ${p.name} — $${(p.price ?? 0).toLocaleString("es-CL")}${p.category ? ` [${p.category}]` : ""}`)
        .join("\n");

      return res.status(200).json({
        fulfillmentText: `Encontré esto para "${q}":\n${listado}\n\nPuedes verlos en la sección Productos.`,
        source: "mercadiashop",
      });
    }

    if (intent === "PoliticaEnvio") {
      return res.status(200).json({
        fulfillmentText: "Enviamos a todo Chile. Envío gratis sobre $50.000. ¿Para qué comuna lo necesitas?",
        source: "mercadiashop",
      });
    }

    if (intent === "PoliticaDevolucion") {
      return res.status(200).json({
        fulfillmentText: "Tienes 30 días para cambios/devoluciones (producto sin uso y con empaque).",
        source: "mercadiashop",
      });
    }

    // Fallback
    return res.status(200).json({
      fulfillmentText:
        "Puedo ayudarte a buscar productos y resolver dudas de envíos/pagos. Ej: “teclado mecánico RGB”.",
      source: "mercadiashop",
    });
  } catch (e: any) {
    console.error("DF webhook error:", e?.message || e);
    return res.status(200).json({
      fulfillmentText: "Oops, tuve un problema consultando el catálogo. Intenta de nuevo.",
      source: "mercadiashop",
    });
  }
}
