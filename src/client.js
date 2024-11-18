import { createClient } from '@supabase/supabase-js'

const URL = 'https://ddpjyqzldjtwgkkogbqs.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcGp5cXpsZGp0d2dra29nYnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MDMxNTIsImV4cCI6MjA0NzM3OTE1Mn0.2vI-mn5XJHHk0gZqEq7vGBR8CfPMrleO4bFOgdzpm_Y';

export const supabase = createClient(URL, API_KEY);