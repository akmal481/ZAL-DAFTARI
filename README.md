# Zal Daftari (React + Vite)

## Kompyuterda ishga tushirish
npm install
npm run dev

## Qurilmalar o'rtasida saqlash (Firebase, bepul)
1. console.firebase.google.com -> loyiha yarating -> Build -> Firestore Database -> Create (production mode).
2. Rules bo'limiga quyidagini qo'ying va Publish bosing:
   rules_version = '2'; service cloud.firestore { match /databases/{d}/documents { match /zal/{id} { allow read, write: if true; } } }
3. Project settings -> Your apps -> Web (</>) -> config ichidan 4 qiymatni oling.
4. .env.example ni .env ga ko'chiring va to'ldiring.
5. Vercel: Settings -> Environment Variables ga o'sha 4 ta VITE_FB_* ni qo'shing, so'ng Redeploy.

Firebase kalitlari qo'yilmasa, ma'lumot faqat shu brauzerda saqlanadi.
