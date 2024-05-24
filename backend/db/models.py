# 모델 정의
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from .database import Base

class Code(Base):
    __tablename__ = "code"
    
    code_id = Column(Integer, primary_key=True)
    before_code = Column(String)
    after_code = Column(String)
    before_carbon = Column(Float)
    after_carbon = Column(Float)
    github_id = Column(String, nullable=True)
    date = Column(Date)
    runtime = Column(Float)
    memory = Column(Float)
    energy_needed = Column(Float)
    stdout = Column(String)
    country_id = Column(Integer, ForeignKey('country.country_id'))

class Mapping(Base):
    __tablename__ = "mapping"
    
    mapping_id = Column(Integer, primary_key=True)
    code_id = Column(Integer, ForeignKey('code.code_id'))
    algorithm_id = Column(Integer)

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
    