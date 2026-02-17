import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  date: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  site_name: string;
  tagline: string;
  about: string;
  contact_email: string;
  instagram: string;
  facebook: string;
  hero_image: string;
  updated_at: string;
};
