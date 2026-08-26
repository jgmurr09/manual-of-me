import os
import requests

from config import settings


class AskSage:

    def __init__(self):
        self.token = None

    def authenticate(self):


        response = requests.post(
            "https://api.asksage.ai/user/get-token-with-api-key",
            json={
                "email": settings.asksage_email,
                "api_key": settings.asksage_api_key
            }
        )
        
        self.token = response.json()["response"]["access_token"]

            

    def query(self, message):

        if self.token is None:
            self.authenticate()

        response = requests.post(

            "https://api.asksage.ai/server/query",

            headers={
                "x-access-tokens": self.token
            },

            json={
                "message": message,
                # "persona": 1,
                "dataset": "TANG-Primers",
                "model": "gpt-4.1-mini",
                "temperature": 0.15,
                "limit_references": 5,
                "live": 0
            }


        )

        print(response.json())

        return response.json()