from flask import Flask
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os

load_dotenv()

application = Flask(__name__)
application.config.from_object(__name__)

application.secret_key = os.getenv("SECRET_KEY")
application.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['JSON_AS_ASCII'] = False


db = SQLAlchemy(application)

