"""
API Documentation for GigMe API
"""

# General API description
api_description = """
# GigMe API

GigMe adalah platform freelance micro-jobs yang dirancang khusus untuk Gen Z di Indonesia, 
menggabungkan konsep Fiverr dengan elemen sosial seperti TikTok.

## Fitur Utama

- **Sistem Pengguna**: Pendaftaran, login, profil, dan manajemen pengguna
- **Sistem Gig**: Pembuatan, pencarian, dan manajemen gig
- **Sistem Order**: Pemesanan, pengiriman, dan manajemen order
- **Sistem Pembayaran**: Integrasi dengan gateway pembayaran lokal
- **Sistem Review**: Ulasan dan rating untuk gig dan pengguna
- **Sistem Pesan**: Komunikasi antara pembeli dan penjual
- **Sistem Notifikasi**: Pemberitahuan untuk aktivitas penting

## Autentikasi

Semua endpoint API (kecuali beberapa endpoint publik) memerlukan autentikasi.
Autentikasi menggunakan JWT (JSON Web Token) dengan format:

```
Authorization: Bearer {token}
```

## Kode Status

- `200 OK`: Permintaan berhasil
- `201 Created`: Sumber daya berhasil dibuat
- `400 Bad Request`: Permintaan tidak valid
- `401 Unauthorized`: Autentikasi diperlukan
- `403 Forbidden`: Tidak memiliki izin
- `404 Not Found`: Sumber daya tidak ditemukan
- `429 Too Many Requests`: Terlalu banyak permintaan
- `500 Internal Server Error`: Kesalahan server
"""

# Tags metadata
tags_metadata = [
    {
        "name": "Authentication",
        "description": "Operasi terkait autentikasi pengguna, termasuk pendaftaran, login, dan refresh token.",
    },
    {
        "name": "Users",
        "description": "Operasi terkait manajemen pengguna, termasuk profil, avatar, dan statistik.",
    },
    {
        "name": "Gigs",
        "description": "Operasi terkait gig, termasuk pembuatan, pencarian, dan manajemen gig.",
    },
    {
        "name": "Orders",
        "description": "Operasi terkait order, termasuk pemesanan, pengiriman, dan manajemen order.",
    },
    {
        "name": "Payments",
        "description": "Operasi terkait pembayaran, termasuk pembuatan pembayaran dan webhook.",
    },
    {
        "name": "Messages",
        "description": "Operasi terkait pesan, termasuk percakapan dan pesan.",
    },
    {
        "name": "Reviews",
        "description": "Operasi terkait ulasan, termasuk pembuatan dan manajemen ulasan.",
    },
    {
        "name": "Search",
        "description": "Operasi terkait pencarian, termasuk pencarian gig dan pengguna.",
    },
    {
        "name": "Categories",
        "description": "Operasi terkait kategori, termasuk daftar dan detail kategori.",
    },
    {
        "name": "Notifications",
        "description": "Operasi terkait notifikasi, termasuk daftar dan manajemen notifikasi.",
    },
]

# Examples for request bodies
examples = {
    "user_create": {
        "email": "user@example.com",
        "username": "johndoe",
        "full_name": "John Doe",
        "password": "securepassword",
        "role": "both"
    },
    "user_login": {
        "email": "user@example.com",
        "password": "securepassword"
    },
    "gig_create": {
        "title": "Desain logo minimalis untuk brand kamu",
        "category_id": "123e4567-e89b-12d3-a456-426614174000",
        "description": "Saya akan mendesain logo minimalis yang sesuai dengan brand kamu.",
        "requirements": "Berikan deskripsi brand dan referensi yang kamu suka.",
        "delivery_time_days": 2,
        "revision_count": 2,
        "packages": [
            {
                "tier": "basic",
                "name": "Basic",
                "description": "Logo dalam format PNG",
                "price": 50000,
                "delivery_time_days": 2,
                "revision_count": 1,
                "features": ["1 konsep", "Format PNG", "Resolusi tinggi"]
            },
            {
                "tier": "standard",
                "name": "Standard",
                "description": "Logo dalam format PNG dan AI",
                "price": 100000,
                "delivery_time_days": 2,
                "revision_count": 2,
                "features": ["2 konsep", "Format PNG dan AI", "Resolusi tinggi", "Source file"]
            }
        ],
        "tags": ["logo", "design", "minimalist"]
    },
    "order_create": {
        "gig_id": "123e4567-e89b-12d3-a456-426614174000",
        "package_id": "123e4567-e89b-12d3-a456-426614174000",
        "brief": "Saya ingin logo untuk bisnis kopi saya bernama 'Kopi Kita'."
    },
    "payment_create": {
        "order_id": "123e4567-e89b-12d3-a456-426614174000",
        "payment_method": "gopay"
    },
    "message_create": {
        "conversation_id": "123e4567-e89b-12d3-a456-426614174000",
        "content": "Halo, saya tertarik dengan gig kamu."
    },
    "review_create": {
        "order_id": "123e4567-e89b-12d3-a456-426614174000",
        "rating": 5,
        "comment": "Sangat puas dengan hasil kerjanya, cepat dan sesuai dengan yang saya inginkan."
    }
}
