import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, topics, examDate } = body;

    if (!subject || !topics || !examDate) {
      return NextResponse.json(
        { error: 'Missing required fields: subject, topics, examDate' },
        { status: 400 }
      );
    }

    // Calculate days until exam
    const today = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.ceil(
      (exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExam <= 0) {
      return NextResponse.json(
        { error: 'Exam date must be in the future' },
        { status: 400 }
      );
    }

    const prompt = `You are an expert academic study planner. Create a detailed, structured, and personalized study plan for a student.

Student Details:
- Subject: ${subject}
- Topics to cover: ${topics}
- Exam Date: ${examDate}
- Days until exam: ${daysUntilExam} days

Please generate a comprehensive study plan with the following structure:
1. **Overview** - Brief summary of the study strategy
2. **Weekly Breakdown** - Day-by-day or week-by-week schedule organizing the topics
3. **Study Tips** - 3-5 specific tips tailored to this subject
4. **Resources** - Recommended resources or study methods
5. **Final Week Checklist** - What to do in the last week before the exam

Make the plan realistic, actionable, and encouraging. Format it clearly with proper headings and bullet points.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are PrepWise AI, an expert academic study planner. Your goal is to help students prepare for exams with structured, personalized, and achievable study plans. Always be encouraging and practical.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedPlan = completion.choices[0]?.message?.content || '';

    // Save to Supabase
    const { data, error } = await supabase
      .from('study_plans')
      .insert([
        {
          subject,
          topics,
          exam_date: examDate,
          plan: generatedPlan,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save plan to database', plan: generatedPlan },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: generatedPlan,
      savedPlan: data,
    });
  } catch (error: unknown) {
    console.error('API error:', error);
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
