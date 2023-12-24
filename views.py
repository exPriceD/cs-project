from flask import render_template, Response
from config import application, db
from models import Items
import json


@application.route('/')
def main():
    return render_template("index.html")


@application.route('/api/items', methods=["GET"])
def get_items():
    try:
        items = Items.query.all()
        response = {"status": 200, "items": []}
        for item in items:
            item_data = {
                "id": item.id,
                "name": item.name,
                "price": item.price,
                "discount": item.discount,
                "discount_value": item.discount_value,
                "image": item.image
            }
            response["items"].append(item_data)
        return Response(
            response=json.dumps(response, ensure_ascii=False),
            status=200,
            mimetype="application/json",
        )
    except Exception as E:
        print(E)
        response = {"status": 500, "text": "Unexpected error"}
        return Response(
            response=json.dumps(response, ensure_ascii=False),
            status=500,
            mimetype="application/json",
        )