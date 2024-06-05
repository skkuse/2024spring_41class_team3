from pydantic import BaseModel
from typing import List, Optional
from .models import *
from datetime import date

#code
class CodeResponse(BaseModel):
    id: int
    runtime: float
    memory: float
    before_code: str
    after_code: str
    before_carbon: float
    after_carbon: float
    github_id: Optional[str]
    date: date
    energy_needed: float
    stdout: str
    sharing: bool
    country_id: int

def convert_code(codes: List[Code]):
    return [CodeResponse(id=code.code_id, 
            runtime=code.runtime,
            memory=code.memory,
            before_code=code.before_code,
            after_code=code.after_code,
            before_carbon=code.before_carbon,
            after_carbon=code.after_carbon,
            github_id=code.github_id,
            date=code.date,
            energy_needed=code.energy_needed,
            stdout=code.stdout,
            sharing=code.sharing,
            country_id=code.country_id
            ) for code in codes]

#country
class CountryResponse(BaseModel):
    id: int
    name: str
    total_reduction: float
    
def convert_country(countries: List[Country]):
    return [CountryResponse(id=country.country_id, name=country.name, total_reduction=country.total_reduction) for country in countries]

#visitor


# /api/default response
class DefaultResponse(BaseModel):
    daily_visitor: int
    total_visitor: int
    total_reduction: float
    countries: List[CountryResponse]

# /api/code request/response
class CodeRequest(BaseModel):
    code: str
    country: str

class CodeSuccessResponse(BaseModel):
    code_id: Optional[int]
    runtime: float
    memory: float
    before_code: str
    after_code: str
    before_carbon: float
    after_carbon: float
    energy_needed: float
    stdout: str
    algorithm_types: List[int]
    change_lines: List[int]
    
class CodeErrorResponse(BaseModel):
    stderr: str
    
# /api/sharing request/response
class SharingRequest(BaseModel):
    code_id: int
    anonymous: bool
    github_id: Optional[str]

# /api/bulletin request/response
class BulletinResponse(BaseModel):
    codes: List[CodeResponse]

