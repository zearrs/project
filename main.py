from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Mahkota Technologys")

# Serve file statis (css, js, gambar)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

templates = Jinja2Templates(directory=BASE_DIR / "templates")


# ==============================================
# MODELS
# ==============================================
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


# ==============================================
# DUMMY DATA (nanti bisa diganti database)
# ==============================================
CONTACT_PERSONS = [
    {
        "name": "E-mail",
        "role": "Mahkota Technology",
        "email": "putramahkotatechnology@gmail.com",
        "photo": "/static/img/gmail.webp",
        "gmail": "rakaganteng1221@gmail.com",
    },
    {
        "name": "WhatsApp",
        "role": "Mahkota Technology",
        "phone": "+62 813 4877 1000 (Rahmad Kurniawan)",
        "photo": "/static/img/wa1.webp",
        "whatsapp": "https://wa.me/6281348771000",
    },

    {
        "name": "Address",
        "role": "Mahkota Technology",
        "email": "Jl. Marsma R Iswahyudi, RT 06, NO. 12, Kel. Sungai Nangka, Kec. Balikpapan Selatan, Kota Balikpapan",
        "photo": "/static/img/map1.webp",
        "maps": "https://www.google.com/maps/place/MAHKOTA+TECHNOLOGY/@-1.2682165,116.87583,17z/data=!4m6!3m5!1s0x2df14773dbc43043:0x3a581d3e952310c4!8m2!3d-1.2682138!4d116.8774089!16s%2Fg%2F11qydf4vqd?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D",
    }
]

GALERY_ITEMS = {
    "2026": [
        {""
        "title": "Implementasi Sistem ERP - Dinas Kesehatan Kota Balikpapan",
        "photo": "/static/img/dokumentasi/icon.webp"
         },
         
        {"title": "Migrasi Infrastruktur Cloud - Puskesmas Sumber Rejo Balikpapan"},
        {"title": "Pengembangan Aplikasi Internal - Puskesmas Klandasan Balikpapan"},
        {"title": "Audit Keamanan Jaringan - Kelurahan Gunung Samarinda Baru"},
        {"title": "Dashboard Analitik - Kelurahan Gunung Samarinda Baru"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
    ],
    "2025": [
        {"title": "Implementasi Sistem ERP - Dinas Kesehatan Kota Balikpapan"},
        {"title": "Migrasi Infrastruktur Cloud - Puskesmas Sumber Rejo Balikpapan"},
        {"title": "Pengembangan Aplikasi Internal - Puskesmas Klandasan Balikpapan"},
        {"title": "Audit Keamanan Jaringan - Kelurahan Gunung Samarinda Baru"},
        {"title": "Dashboard Analitik - Kelurahan Gunung Samarinda Baru"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
    ],
    "2024": [
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Kerja sama 1 - 2024"},
        {"title": "Kerja sama 2 - 2024"},
    ],
    "2023": [
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Setup Data Center Regional - Kelurahan Sungai Nangka"},
        {"title": "Kerja sama 1 - 2023"},
    ],
}

# ==============================================
# ROUTES - HALAMAN
# ==============================================
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request, "index.html")


# ==============================================
# ROUTES - API
# ==============================================
@app.get("/api/contact-persons")
async def get_contact_persons():
    return CONTACT_PERSONS


@app.get("/api/galery")
async def get_galery():
    return GALERY_ITEMS

