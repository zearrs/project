# Cara Run
Pastikan terinstall python3, dan python3-pip

# 1. Install buat dan aktifkan venv

# Windows
py -m venv nama_env

# Linux/macOS
python3 -m venv nama_env

# 2. Aktifkan Venv nya

# Windows (PowerShell)
.\nama_env\Scripts\Activate.ps1

# Windows (Command Prompt/CMD)
nama_env\Scripts\activate.bat

# Linux/macOS
source nama_env/bin/activate   

# 3. Install requirements.txt
# Step
pip install -r requirements.txt

# 4. Running by uvicorn
uvicorn main:app --reload

