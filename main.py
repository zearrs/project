from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Nexora Systems - Company Profile")

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
    }
]

GALERY_ITEMS = [
    {"title": "Implementasi Sistem ERP - PT Sinar Abadi"},
    {"title": "Migrasi Infrastruktur Cloud - Klien Ritel"},
    {"title": "Pengembangan Aplikasi Internal - Sektor Logistik"},
    {"title": "Audit Keamanan Jaringan - Klien Perbankan"},
    {"title": "Dashboard Analitik Real-time"},
    {"title": "Setup Data Center Regional"},
    {"title": "Setup Data Center Regional"},
    {"title": "Setup Data Center Regional"}
]

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

