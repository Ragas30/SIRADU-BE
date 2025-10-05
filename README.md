# 🩺 SIRADU Backend API

Ini adalah backend API untuk sistem SIRADU (Sistem Informasi Rumah Sakit), dibangun menggunakan **Express.js** dan **Prisma ORM**.

---

## 🚀 Fitur Utama

- Login perawat (role-based authentication)
- Validasi input dengan schema validator
- Prisma ORM dengan PostgreSQL
- JWT Auth
- Modular folder structure (controller, service, validation, dll.)

---

## 📦 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt

---

## ⚙️ Langkah Setup Setelah Clone Repo

### 1. Clone Repo

```bash
git clone https://github.com/username/siradu-backend.git
cd siradu-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File .env dan sesuaikan value berikut

```
DATABASE_URL="postgresql://postgres:12345678@{hostname}:{port}/{database-name}?schema={schema-name}"
JWT_SECRET="JWT_SECRET_KEY"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Reset Database (Untuk Development)

```bash
npx prisma migrate reset
```

### 6. Jalankan Seeder (Optional)

```bash
npx prisma db seed
```

### 7. Jalankan Server

```bash
npm run dev
```