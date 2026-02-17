/*
  # GlassscreenI Photography Portfolio Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project title
      - `description` (text) - Project description
      - `image_url` (text) - Main project image URL
      - `category` (text) - Project category (wedding, portrait, etc.)
      - `date` (date) - Project date
      - `featured` (boolean) - Whether to feature on homepage
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text) - Package name
      - `description` (text) - Package description
      - `price` (text) - Price (stored as text for flexibility)
      - `features` (jsonb) - Array of package features
      - `popular` (boolean) - Mark as popular package
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `site_name` (text)
      - `tagline` (text)
      - `about` (text)
      - `contact_email` (text)
      - `instagram` (text)
      - `facebook` (text)
      - `hero_image` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for all tables (portfolio is public)
    - Only authenticated users can insert/update/delete (admin only)
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  category text DEFAULT 'general',
  date date DEFAULT CURRENT_DATE,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  popular boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone"
  ON packages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert packages"
  ON packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update packages"
  ON packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete packages"
  ON packages FOR DELETE
  TO authenticated
  USING (true);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text DEFAULT 'GlassscreenI',
  tagline text DEFAULT 'Capturing moments, creating memories',
  about text DEFAULT '',
  contact_email text DEFAULT '',
  instagram text DEFAULT '',
  facebook text DEFAULT '',
  hero_image text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by everyone"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default settings
INSERT INTO site_settings (site_name, tagline, about)
VALUES ('GlassscreenI', 'Capturing moments, creating memories', 'Professional photography services for your special moments.')
ON CONFLICT DO NOTHING;