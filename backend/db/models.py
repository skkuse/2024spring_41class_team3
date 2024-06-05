# 모델 정의
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Code(Base):
    __tablename__ = "code"
    
    code_id = Column(Integer, primary_key=True)
    runtime = Column(Float)
    memory = Column(Float)
    before_code = Column(String)
    after_code = Column(String)
    before_carbon = Column(Float)
    after_carbon = Column(Float)
    github_id = Column(String, nullable=True)
    date = Column(Date)
    energy_needed = Column(Float)
    stdout = Column(String)
    sharing = Column(Boolean)
    country_id = Column(Integer, ForeignKey('country.country_id'))
    
    # 역참조
    mappings = relationship("Mapping", back_populates="code")
    # imappings = relationship("Imapping", back_populates="code")
    # Omappings = relationship("Omapping", back_populates="code")
    
class Mapping(Base):
    __tablename__ = "mapping"
    
    mapping_id = Column(Integer, primary_key=True)
    code_id = Column(Integer, ForeignKey('code.code_id'))
    algorithm_id = Column(Integer)
    
    # 참조
    code = relationship("Code", back_populates="mappings")
    
# class Imapping(Base):
#     __tablename__ = "Imapping"
    
#     imapping_id = Column(Integer, primary_key=True)
#     code_id = Column(Integer, ForeignKey('code.code_id'))
#     line = Column(Integer)
    
#     # 참조
#     code = relationship("Code", back_populates="imappings")

# class Omapping(Base):
#     __tablename__ = "Imapping"
    
#     imapping_id = Column(Integer, primary_key=True)
#     code_id = Column(Integer, ForeignKey('code.code_id'))
#     line = Column(Integer)
    
#     # 참조
#     code = relationship("Code", back_populates="omappings")
    
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
    