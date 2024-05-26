from sqlalchemy.orm import Session
from .models import *
from .schema import *

#code
def get_code(db: Session):
    return db.query(Code).all()

def add_code(db: Session, item: Code):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item.code_id

#country
def get_country(db: Session):
    return db.query(Country).all()

#visitor
def get_visitor(db: Session):
    return db.query(Visitor).all()