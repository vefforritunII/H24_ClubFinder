import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vlpospugfqmfwflxdyzc.supabase.co/";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscG9zcHVnZnFtZndmbHhkeXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwOTAwMTYsImV4cCI6MjA0NjY2NjAxNn0.jfqdyPqHnRwAKk72PhFiEIsL7tNtTHBEldA0y2duK4w";

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
