# 모델 정의
from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Code(Base):
    __tablename__ = "code"
    
    code_id = Column(Integer, primary_key=True)
    before = Column(String)
    after = Column(String)
    github_id = Column(String, nullable=True)

class Country(Base):
    __tablename__ = "country"
    
    country_id = Column(Integer, primary_key=True)
    name = Column(String)
    total_reduction = Column(Float)

class Visitor(Base):
    __tablename__ = "visitor"
    
    visitor_id = Column(Integer, primary_key=True)
    date = Column(Date)
    daily_visitor = Column(Integer)
