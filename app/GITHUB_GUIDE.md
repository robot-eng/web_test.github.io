# 📤 วิธีอัพ Pastel Finance ขึ้น GitHub

## 📋 ขั้นตอน

### **ขั้น 1: สร้าง GitHub Account (ถ้ายังไม่มี)**
1. ไปที่ https://github.com/join
2. ลงทะเบียน (หรือเข้าสู่ระบบถ้ามีแล้ว)

### **ขั้น 2: สร้าง New Repository**
1. คลิกที่ **+** (มุมบนขวา)
2. เลือก **New repository**
3. ใส่ข้อมูล:
   - **Repository name**: `pastel-finance`
   - **Description**: `💰 Progressive Web App for personal finance tracking with pastel design`
   - **Public** ✅ (เพื่อให้คนอื่นดูได้)
   - **Add .gitignore**: ข้ามได้ (มีอยู่แล้ว)
   - **Add a README**: ข้ามได้ (มีอยู่แล้ว)
4. คลิก **Create repository**

### **ขั้น 3: Push ขึ้น GitHub**

**คำสั่ง (คัดลอกจากหน้า GitHub repository)**

```bash
cd "C:\Users\aum28\OneDrive\Desktop\app"

# ตั้งชื่อ branch
git branch -M main

# เพิ่ม remote (แทน YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pastel-finance.git

# Push ขึ้น
git push -u origin main
```

### **ขั้น 4: ยืนยัน GitHub (Personal Access Token)**
1. ไปที่ GitHub Settings → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. คลิก **Generate new token (classic)**
3. ใส่:
   - **Note**: `Git CLI Push`
   - **Expiration**: 90 days (หรือนานกว่านั้น)
   - **Scopes**: ✅ `repo` (full control)
4. คลิก **Generate token**
5. **คัดลอก token** (จะแสดงแค่ครั้งเดียว)

### **ขั้น 5: ใช้ Token เมื่อ Push**
PowerShell จะถาม `Password` ให้ใส่ token ที่คัดลอก:
```
Username: YOUR_GITHUB_USERNAME
Password: [ใส่ token ที่คัดลอก]
```

---

## 🚀 ทั้งหมดในคำสั่งเดียว

```bash
cd "C:\Users\aum28\OneDrive\Desktop\app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pastel-finance.git
git push -u origin main
```

---

## ✅ ตรวจสอบความสำเร็จ

1. ไปที่ https://github.com/YOUR_USERNAME/pastel-finance
2. ควรเห็นไฟล์ทั้งหมด
3. ✅ เสร็จ!

---

## 📚 อัพเดตหลังจากนี้

ทุกครั้งที่แก้ไฟล์:

```bash
git add .
git commit -m "✨ เพิ่ม feature ใหม่"
git push origin main
```

---

## 🔗 ลิงก์ที่จะได้

- **Repository**: https://github.com/YOUR_USERNAME/pastel-finance
- **Live Demo** (กำลังจะได้):
  - GitHub Pages: https://YOUR_USERNAME.github.io/pastel-finance
  - Vercel: https://pastel-finance.vercel.app
  - Netlify: https://pastel-finance.netlify.app

---

## 🌐 Deploy สดหลังจากอัพ GitHub

### **GitHub Pages (ฟรี)**
1. ไปที่ **Settings** → **Pages**
2. **Source**: เลือก `main` branch
3. คลิก **Save**
4. รอ 1-2 นาที
5. ✅ ใช้ได้ที่: `https://YOUR_USERNAME.github.io/pastel-finance`

### **Vercel (ฟรี ตั้งแต่ GitHub)**
1. ไปที่ https://vercel.com
2. ล็อกอินด้วย GitHub
3. คลิก **Import Project**
4. เลือก `pastel-finance` repository
5. คลิก **Deploy**
6. ✅ เสร็จใน 2-3 นาที

### **Netlify (ฟรี)**
1. ไปที่ https://netlify.com
2. ล็อกอินด้วย GitHub
3. ลาก-วาง folder หรือ Connect repository
4. ✅ ได้ URL เสร็จใน 1 นาที

---

## 💡 Tips

✅ ใช้ Personal Access Token ที่ปลอดภัยกว่า SSH  
✅ ตั้ง .gitignore เพื่อไม่อัพ node_modules  
✅ เขียน commit message ที่ดี  
✅ Deploy ด้วย GitHub Pages + Vercel ด้วยได้ (2 ที่)

---

**Ready? ไป GitHub! 🚀**
