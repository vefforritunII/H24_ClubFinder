import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
/*
//Classic import for stuff that this needs
import { useEffect, useState } from "react";
import { supabase } from "@/app/library/supabaseClients";

//Makes a array so we can use and store the data used
  const [notes, setNotes] = useState<Note[]>([]);

//Function that feches data from supper base and places it in notes to be used
  useEffect(() => {
    //use this to select what table you want to use and what you want from it
    supabase.from("notes").select("*").then(({ data, error }) => {
      if (error) console.error("Error fetching notes:", error);
      setNotes(data || []);
    });
  }, []);
*/
