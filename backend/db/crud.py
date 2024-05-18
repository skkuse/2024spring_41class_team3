from sqlalchemy.orm import Session
from .models import *
from .schema import *

#code
def get_code(db: Session):
    return db.query(Code).all()

def add_code(db: Session, item: CodeRequest):
    db_item = Code(code_id=item.code_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db.query(Code).all()

#country
def get_country(db: Session):
    return db.query(Country).all()

#visitor
def get_visitor(db: Session):
    return db.query(Visitor).all()