from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message":"hello"}


# home

# api1. input code
# return "co2"