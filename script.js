// CodeLinks - JavaScript كامل (جمع 4 أجزاء)
// انسخ هذا الملف كاملاً وضعه في ملف script.js في GitHub

// =============== الجزء الأول ===============
// متغيرات عامة
let currentGame = null;
let currentPage = 'home-page';
let gameState = {
    phase: 'waiting',
    currentTeam: 'red',
    spymaster: null,
    wordGrid: [],
    gameHistory: []
};

// بيانات اللعبة
const gameData = {
    words: [
        'كتاب', 'فيل', 'نهر', 'جبل', 'نجمة', 'حفل', 'قمر', 'ورد', 'باب', 'حديقة',
        'طائرة', 'موسيقى', 'لحم', 'مطبخ', 'خروف', 'عسل', 'سلم', 'ورق', 'مطر', 'صندوق',
        'صوفا', 'قميص', 'رقم', 'كبير', 'سعيد', 'سريع', 'جديد', 'قديم', 'ساخن', 'بارد',
        'مكتبة', 'فناء', 'سيارة', 'كمبيوتر', 'هاتف', 'مدرسة', 'مستشفى', 'بنك', 'مسجد', 'كتاب',
        'جرس', 'جسر', 'مصعد', 'سيف', 'جدي', 'موزة', 'تفاحة', 'فراولة', 'موز', 'خرسانة',
        'كيميا', 'فيزياء', 'طب', 'هندسة', 'تاريخ', 'جغرافيا', 'أدب', 'فن', 'موسيقى', 'نحت',
        'رياضة', 'كرة', 'تنس', 'سباحة', 'جري', 'جمباز', 'ملاكمة', 'هوكي', 'غولف', 'تايكوندو',
        'دول', 'مدن', 'جبل', 'صحراء', 'غابة', 'بحر', 'جزيرة', 'ودية', 'نورا', 'ثقافة',
        'زمن', 'سماء', 'نجوم', 'كوكبة', 'مجرة', 'شمس', 'زحل', 'عطارد', 'المريخ', 'أورانوس',
        'احتفال', 'عيد', 'حفل', 'زفاف', 'مولد', 'موكب', 'عيد', 'رمضان', 'شهر', 'صفر',
        'لعبة', 'كرة', 'دمية', 'كتاب', 'قلم', 'مدرسة', 'أصدقاء', 'حديقة', 'حيوانات', 'لحم',
        'سعيد', 'حزين', 'أخضر', 'أحمر', 'أزرق', 'كبير', 'صغير', 'بطيء', 'قوي', 'ناعم'
    ],
    
    teamSizes: {
        classic: { red: 9, blue: 8, bystander: 7, assassin: 1 },
        quick: { red: 4, blue: 4, bystander: 3, assassin: 1 },
        tournament: { red: 6, blue: 6, bystander: 4, assassin: 1 }
    },
    
    gameModes: {
        classic: {
            name: 'اللعب الكلاسيكي',
            description: 'اللعبة التقليدية مع شبكة 5×5 من الكلمات',
            minPlayers: 2,
            maxPlayers: 8,
            timeLimit: 30
        },
        quick: {
            name: 'اللعب السريع',
            description: '3 جولات في 15 دقيقة للعبة مكثفة',
            minPlayers: 2,
            maxPlayers: 6,
            timeLimit: 10
        },
        ai: {
            name: 'ضد الذكاء الاصطناعي',
            description: 'اختبر مهاراتك ضد ماستر ذكي',
            minPlayers: 1,
            maxPlayers: 2,
            timeLimit: 20
        },
        tournament: {
            name: 'البطولة',
            description: 'تحديات متدرجة مع جوائز خاصة',
            minPlayers: 4,
            maxPlayers: 12,
            timeLimit: 25
        }
    }
};

// أسلوب اللاعب
let playerStats = {
    totalGames: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    averageTime: '0:00',
    bestClueRating: 0,
    specialization: 'مبتدئ',
    achievements: [],
    score: 0,
    level: 'مبتدئ',
    levelProgress: 0,
    nextLevelScore: 100
};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('CodeLinks Game Initialized');
    
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
    
    setupEventListeners();
    updatePlayerStats();
    showPage('home-page');
});

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (mainScreen) {
                mainScreen.classList.remove('hidden');
            }
        }, 500);
    }
}
