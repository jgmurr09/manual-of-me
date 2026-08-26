import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from asksage import AskSage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://jgmurr09.github.io/manual-of-me/"], # add your URL here: 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sage = AskSage()

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        print("Received:", request.message)
        response = sage.query(request.message)
        return response
    except Exception as exc:
        return {
            "error": f"Chat request failed: {str(exc)}"
        }