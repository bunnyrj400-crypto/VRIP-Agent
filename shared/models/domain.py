from datetime import datetime
from enum import Enum
from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, Field, HttpUrl

class Industry(str, Enum):
    FINTECH = "FinTech"
    SAAS = "SaaS"
    MANUFACTURING = "Manufacturing"
    HEALTHCARE = "Healthcare"
    OTHER = "Other"

class RiskDimension(str, Enum):
    SECURITY = "Security"
    FINANCIAL = "Financial"
    OPERATIONAL = "Operational"
    COMPLIANCE = "Compliance"

class IncidentType(str, Enum):
    CYBER = "Cyber"
    FINANCIAL = "Financial"
    OPERATIONAL = "Operational"
    COMPLIANCE = "Compliance"

class Criticality(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    MISSION_CRITICAL = "Mission-Critical"

class Vendor(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    legal_name: str
    domain: str
    industry: Industry
    criticality: Criticality = Criticality.MEDIUM
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Evidence(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    source_url: Optional[HttpUrl] = None
    source_reliability: float = Field(ge=0.0, le=1.0)
    extracted_text: str
    detected_at: datetime = Field(default_factory=datetime.utcnow)

class Incident(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    vendor_id: UUID
    type: IncidentType
    severity: float = Field(ge=0.0, le=10.0)
    description: str
    evidence_ids: List[UUID] = []
    detected_at: datetime

class RiskScore(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    vendor_id: UUID
    dimension: RiskDimension
    value: float = Field(ge=0.0, le=100.0)
    confidence: float = Field(ge=0.0, le=1.0)
    reasoning_trace: str
    calculated_at: datetime = Field(default_factory=datetime.utcnow)
