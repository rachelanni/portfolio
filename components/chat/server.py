# This is a server for the chatkit session
# It is used to create a chatkit session for the user
# The session is used to send messages to the user
# The session is used to receive messages from the user
# The session is used to send messages to the user 
# This snippet spins up a fast api service whose sole job is to create a new chatkit session via the OpenAI Python SDK and hand back the sessions's client secret:

from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()
openai = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

@app.post("/api/chatkit/session")
def create_chatkit_session():
    session = openai.chatkit.sessions.create({
      # ...
    })
    return { client_secret: session.client_secret }
