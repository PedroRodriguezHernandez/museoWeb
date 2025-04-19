import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ixxpufbjinyviuodwxfl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eHB1ZmJqaW55dml1b2R3eGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDE0MTMsImV4cCI6MjA2MDM3NzQxM30.p_KjP05f-xM0C487sc5whI6LHoiy_bUDgcABO2_Y_QI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
