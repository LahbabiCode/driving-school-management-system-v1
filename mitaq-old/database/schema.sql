-- إنشاء جداول قاعدة البيانات لمنصة مدرسة الميثاق

-- جدول الطلاب
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول نتائج الاختبارات
CREATE TABLE IF NOT EXISTS test_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    series_number INTEGER NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    answers JSONB NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول نتائج المهارات
CREATE TABLE IF NOT EXISTS skill_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    skill_category VARCHAR(100) NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('passed', 'failed', 'pending')) NOT NULL,
    score INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_test_results_student_id ON test_results(student_id);
CREATE INDEX IF NOT EXISTS idx_test_results_series ON test_results(series_number);
CREATE INDEX IF NOT EXISTS idx_skill_results_student_id ON skill_results(student_id);
CREATE INDEX IF NOT EXISTS idx_skill_results_category ON skill_results(skill_category);

-- تمكين Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_results ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان (اختيارية - يمكن تخصيصها حسب الحاجة)
-- السماح للقراءة والكتابة للجميع (يمكن تقييدها لاحقاً)
CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON students FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Enable update access for all users" ON students FOR UPDATE USING (true);

CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON test_results FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON test_results FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON skill_results FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON skill_results FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Enable update access for all users" ON skill_results FOR UPDATE USING (true);
