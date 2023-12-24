from config import db


class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512))
    price = db.Column(db.Integer)
    discount = db.Column(db.Boolean)
    discount_value = db.Column(db.Integer)
    image = db.Column(db.String(512))

    def __repr__(self):
        return f'Product {self.id}'
