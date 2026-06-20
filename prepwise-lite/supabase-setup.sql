-- PrepWise AI – Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create the study_plans table
CREATE TABLE IF NOT EXISTS study_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  topics TEXT NOT NULL,
  exam_date DATE NOT NULL,
  plan TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

-- Allow all operations (public access for this demo app)
-- In production, you'd want to add authentication-based policies
CREATE POLICY "Allow all operations" ON study_plans
  FOR ALL USING (true) WITH CHECK (true);

-- Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS study_plans_created_at_idx ON study_plans (created_at DESC);

-- Create an index on exam_date for filtering upcoming exams
CREATE INDEX IF NOT EXISTS study_plans_exam_date_idx ON study_plans (exam_date);
