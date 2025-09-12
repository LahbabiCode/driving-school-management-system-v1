
import { SkillStatus, SkillCategory } from './types';

export const DRIVING_SKILLS_TEMPLATE: SkillCategory[] = [
  {
    id: 'cat1',
    name: 'التحكم الأساسي في السيارة',
    skills: [
      { id: 'skill1-1', name: 'تشغيل وإيقاف المحرك بسلاسة', status: SkillStatus.NotStarted },
      { id: 'skill1-2', name: 'التحكم في عجلة القيادة', status: SkillStatus.NotStarted },
      { id: 'skill1-3', name: 'استخدام الدواسات (بنزين، فرامل، كلاتش)', status: SkillStatus.NotStarted },
      { id: 'skill1-4', name: 'تغيير السرعات (يدوي)', status: SkillStatus.NotStarted },
    ],
  },
  {
    id: 'cat2',
    name: 'المناورات وركن السيارة',
    skills: [
      { id: 'skill2-1', name: 'الركن الموازي (Parking)', status: SkillStatus.NotStarted },
      { id: 'skill2-2', name: 'الركن العمودي بين سيارتين', status: SkillStatus.NotStarted },
      { id: 'skill2-3', name: 'الرجوع للخلف في خط مستقيم', status: SkillStatus.NotStarted },
      { id: 'skill2-4', name: 'مناورة نصف دورة (Demi-tour)', status: SkillStatus.NotStarted },
    ],
  },
  {
    id: 'cat3',
    name: 'قواعد السير والمرور',
    skills: [
      { id: 'skill3-1', name: 'احترام علامات الأولوية (قف، إعطاء حق الأسبقية)', status: SkillStatus.NotStarted },
      { id: 'skill3-2', name: 'التعامل مع المدارات (Rond-point)', status: SkillStatus.NotStarted },
      { id: 'skill3-3', name: 'استخدام إشارات تغيير الاتجاه', status: SkillStatus.NotStarted },
      { id: 'skill3-4', name: 'الحفاظ على مسافة الأمان', status: SkillStatus.NotStarted },
    ],
  },
  {
    id: 'cat4',
    name: 'القيادة في ظروف مختلفة',
    skills: [
        { id: 'skill4-1', name: 'القيادة داخل المدينة (ازدحام)', status: SkillStatus.NotStarted },
        { id: 'skill4-2', name: 'القيادة في الطريق السريع', status: SkillStatus.NotStarted },
        { id: 'skill4-3', name: 'القيادة الليلية', status: SkillStatus.NotStarted },
    ]
  }
];

export const INITIAL_STUDENTS_DATA = [
    {
        id: 1,
        name: 'أحمد العلوي',
        avatarUrl: 'https://picsum.photos/seed/ahmed/200',
        joinDate: '2024-05-10',
        examReady: false,
        skillCategories: JSON.parse(JSON.stringify(DRIVING_SKILLS_TEMPLATE)),
        instructorNotes: 'يحتاج أحمد للتركيز أكثر على استخدام المرايا قبل تغيير الاتجاه. يظهر تحسناً في التحكم بالسيارة في السرعات المنخفضة.'
    },
    {
        id: 2,
        name: 'فاطمة الزهراء',
        avatarUrl: 'https://picsum.photos/seed/fatima/200',
        joinDate: '2024-04-22',
        examReady: true,
        skillCategories: JSON.parse(JSON.stringify(DRIVING_SKILLS_TEMPLATE)).map((cat: SkillCategory) => ({
            ...cat,
            skills: cat.skills.map(skill => ({...skill, status: SkillStatus.Mastered}))
        })),
        instructorNotes: 'فاطمة جاهزة تماماً للامتحان. قيادتها واثقة وتطبق جميع القواعد بشكل ممتاز. تم حجز موعد الامتحان لها.'
    },
    {
        id: 3,
        name: 'يوسف بوعزة',
        avatarUrl: 'https://picsum.photos/seed/youssef/200',
        joinDate: '2024-06-01',
        examReady: false,
        skillCategories: JSON.parse(JSON.stringify(DRIVING_SKILLS_TEMPLATE)).map((cat: SkillCategory, catIndex: number) => ({
            ...cat,
            skills: cat.skills.map((skill, skillIndex) => ({
                ...skill, 
                status: catIndex < 2 ? SkillStatus.InProgress : SkillStatus.NotStarted
            }))
        })),
        instructorNotes: ''
    }
];