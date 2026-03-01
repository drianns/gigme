# 🚀 GigMe - Fiverr meets TikTok for Indonesian Gen Z

GigMe adalah platform freelance micro-jobs yang dirancang khusus untuk Gen Z di Indonesia. Platform ini memungkinkan pelajar dan mahasiswa memonetisasi skill mereka (design, editing, coding, writing) melalui gigs dengan harga terjangkau (10k-150k) dan turnaround cepat (1-3 hari).

## 🎯 Features

### For Sellers (Freelancers):
- 🎨 Portfolio showcase aesthetic (Instagram-style grid)
- 💰 Quick earnings (withdraw to GoPay/OVO/Dana)
- 📚 Skill categories Gen Z friendly (TikTok editing, IG design, thumbnail YouTube)
- 🏆 Gamification (levels, badges, featured seller)
- 📱 Mobile-first (manage gigs from phone)
- 🔒 Escrow payment (uang aman sampai job selesai)

### For Buyers:
- 🔍 Easy discovery (filter by skill, price, turnaround time)
- 💵 Affordable pricing (mulai 10k)
- ⚡ Fast delivery (1-3 hari)
- 🎯 Quality guaranteed (review system, revision policy)
- 💬 Direct chat with seller (real-time communication)

## 🛠️ Tech Stack

### Frontend:
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui + Headless UI
- State Management: Zustand
- Forms: React Hook Form + Zod validation
- API Client: Axios with interceptors
- Real-time: Supabase Realtime (chat)
- File Upload: Supabase Storage
- Deployment: Vercel

### Backend:
- Framework: FastAPI (Python)
- Language: Python 3.11+
- Database ORM: SQLAlchemy
- Authentication: Supabase Auth + JWT
- Payment: Midtrans + Xendit
- File Storage: Supabase Storage
- Email: Resend / SendGrid
- Background Jobs: Celery + Redis
- API Docs: FastAPI auto-generated (Swagger)
- Deployment: Railway / Render

### Database:
- Primary: Supabase (PostgreSQL)
- Realtime: Supabase Realtime subscriptions
- Caching: Redis (session, rate limiting)
- Search: PostgreSQL Full-Text Search

## 📋 Project Structure

```
gigme/
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # UI components
│   │   ├── lib/            # Utility functions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
└── backend/                # FastAPI backend
    ├── app/
    │   ├── api/            # API endpoints
    │   ├── core/           # Core functionality
    │   ├── db/             # Database models
    │   ├── models/         # SQLAlchemy models
    │   ├── schemas/        # Pydantic schemas
    │   ├── services/       # Business logic
    │   └── tests/          # Unit tests
    ├── main.py             # Application entry point
    └── requirements.txt    # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL
- Redis (optional for caching)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd gigme/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://user:password@localhost/gigme
   SECRET_KEY=your_secret_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   ```

5. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd gigme/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📊 API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

### Backend Tests
```bash
cd gigme/backend
pytest
```

### Frontend Tests
```bash
cd gigme/frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to Railway or Render using the provided configuration files.

### Frontend Deployment
The frontend can be deployed to Vercel with minimal configuration.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Developer
