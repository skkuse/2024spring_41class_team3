from fastapi import FastAPI

app = FastAPI()

# cover page
@app.get("/")
def root():
    return {"message":"hello"}

# input code (post)
# before.java co2 => filtering 1, 2, 3 => time check, after.java co2 => db commit => return

# bulletin

# bulletin detail