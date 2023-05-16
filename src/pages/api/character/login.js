import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // get will return an array of object matching (usually only one)
      const data = await supabase
        .from("users")
        .select()
        .eq("id", req.query.id)
        .single();

      console.log("ok lol");

      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
