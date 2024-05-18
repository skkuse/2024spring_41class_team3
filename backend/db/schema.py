from pydantic import BaseModel
from typing import Optional

#code
class CodeRequestBase(BaseModel):
    code_id: str

class CodeRequestCreate(CodeRequestBase):
    pass

class CodeRequest(CodeRequestBase):
    code_id: Optional[int]
    
    class Config:
        from_attributes = True
        
#country
class CountryRequestBase(BaseModel):
    Country_id: str

class CountryRequestCreate(CountryRequestBase):
    pass

class CountryRequest(CountryRequestBase):
    country_id: Optional[int]
    
    class Config:
        from_attributes = True
        
#visitor
class VisitorRequestBase(BaseModel):
    Visitor_id: str

class VisitorRequestCreate(VisitorRequestBase):
    pass

class VisitorRequest(VisitorRequestBase):
    visitor_id: Optional[int]
    
    class Config:
        from_attributes = True