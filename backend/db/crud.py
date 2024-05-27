from sqlalchemy import func
from sqlalchemy.orm import Session
from .models import *
from .schema import *

#code
def get_code(db: Session):
    return db.query(Code).all()

def get_code_by_id(db: Session, code_id: int):
    return db.query(Code).filter(Code.code_id == code_id).first()

def add_code(db: Session, item: Code):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item.code_id

def sharing_code(db: Session, request: SharingRequest):
    code = get_code_by_id(db, request.code_id)
    if not request.anonymous:
        code.github_id = request.github_id
    code.sharing = True
    db.commit()
    db.refresh(code)
    return

#country
def get_country(db: Session):
    total_reduction = db.query(func.sum(Country.total_reduction)).scalar()
    return total_reduction, db.query(Country).all()

def get_country_by_name(db: Session, name: str):
    country = db.query(Country).filter(Country.name == name).first()
    
    if country:
        return country
    
    new_country = Country(name=name, total_reduction=0.0)
    db.add(new_country)
    db.commit()
    db.refresh(new_country)
    
    return new_country

def update_country(db: Session, country: Country, carbon: float):
    if carbon > 0:
        country.total_reduction += carbon
        db.add(country)
        db.commit()
        db.refresh(country)
    
    return

#mapping
def get_mapping(db: Session, algoritm_type: int):
    return db.query(Mapping).filter(Mapping.algorithm_id == algoritm_type).all()

def add_mapping(db: Session, code_id: int, algorithm_types: List[int]):
    for algorithm_type in algorithm_types:
        item = Mapping(code_id=code_id, algorithm_id=algorithm_type)
        db.add(item)
        db.commit()
        db.refresh(item)
    return

#visitor
def get_visitor(db: Session, date: date):
    visitor = db.query(Visitor).filter(Visitor.date == date).first()
    if not visitor:
        visitor = add_visitor(db, date)

    visitor.daily_visitor += 1
    db.commit()
    db.refresh(visitor)
    
    total_visitor = db.query(func.sum(Visitor.daily_visitor)).scalar()
    
    return total_visitor, visitor.daily_visitor

def add_visitor(db: Session, date: date):
    new_visitor = Visitor(date=date, daily_visitor=0)
    db.add(new_visitor)
    return new_visitor