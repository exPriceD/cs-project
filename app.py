from config import application, db
import views

if __name__ == '__main__':
    application.run(debug=True)
    with application.app_context():
        db.create_all()