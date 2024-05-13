from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

# cover page
@app.get("/")
def home():
    return FileResponse("index.html")

# input code (post)

# before.java co2 => filtering 1, 2, 3 => time check, after.java co2 => db commit => return

# bulletin

# bulletin detail

# input code (post)
