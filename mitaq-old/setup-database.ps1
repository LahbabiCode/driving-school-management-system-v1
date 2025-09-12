#!/usr/bin/env pwsh

Write-Host "🗄️ إعداد قاعدة بيانات Supabase لمنصة الميثاق" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

Write-Host "`n📋 خطوات إعداد قاعدة البيانات:" -ForegroundColor Yellow

Write-Host "`n1. افتح Supabase Dashboard:" -ForegroundColor White
Write-Host "   https://app.supabase.com/project/iroiuwkpmgafrowfgrfu" -ForegroundColor Cyan

Write-Host "`n2. اذهب إلى SQL Editor" -ForegroundColor White

Write-Host "`n3. انسخ والصق هذا الكود SQL:" -ForegroundColor White
Write-Host "   ملف: database/schema.sql" -ForegroundColor Gray

Write-Host "`n4. اضغط Run لتنفيذ الكود" -ForegroundColor White

Write-Host "`n📊 الجداول التي سيتم إنشاؤها:" -ForegroundColor Yellow
Write-Host "   • students - جدول الطلاب" -ForegroundColor White
Write-Host "   • test_results - نتائج الاختبارات" -ForegroundColor White
Write-Host "   • skill_results - نتائج المهارات" -ForegroundColor White

Write-Host "`n🔐 الأمان:" -ForegroundColor Yellow
Write-Host "   • Row Level Security مفعل" -ForegroundColor White
Write-Host "   • سياسات القراءة والكتابة معدة" -ForegroundColor White

Write-Host "`n🌐 الموقع:" -ForegroundColor Cyan
Write-Host "   https://mitaq-driving-school-final.vercel.app" -ForegroundColor White

Write-Host "`n✅ بعد إعداد قاعدة البيانات، ستعمل المنصة بالكامل!" -ForegroundColor Green
