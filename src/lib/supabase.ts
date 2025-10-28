import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dmwjiqrfwrcctuakcanv.supabase.co'  // Replace with your URL from Data API section
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtd2ppcXJmd3JjY3R1YWtjYW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODk0MjUsImV4cCI6MjA3NzE2NTQyNX0.EzUIiuY17vfOs3lnlioy06i3Jw-9L6KBViUaxGC7a-4'  // Replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Todo = {
  id: number
  user_id: string
  text: string
  completed: boolean
  priority: string
  due_date: string | null
  created_at: string
}