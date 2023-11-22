import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")


REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_DB = os.getenv("REDIS_DB")
REDIS_PW = os.getenv("REDIS_PW")


REDDIT_HOST = os.getenv("REDDIT_HOST")
REDDIT_PORT = os.getenv("REDDIT_PORT")
REDDIT_USER = os.getenv("REDDIT_USER")
REDDIT_PW = os.getenv("REDDIT_PW")

DB_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
