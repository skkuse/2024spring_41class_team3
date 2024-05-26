from pydantic import BaseModel
from typing import List
from typing import Optional
from datetime import date

#code

        
#country

        
#visitor


# /api/default response

# /api/code request/response
class CodeRequest(BaseModel):
    code: str
    country: str

class CodeSuccessResponse(BaseModel):
    code_id: int
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

# /api/bulletin request/response

# /api/detail request/response