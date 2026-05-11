from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, relationship
import uuid
from datetime import datetime
from shared.models.domain import Industry, RiskDimension, IncidentType, Criticality

Base = declarative_base()

class VendorDB(Base):
    __tablename__ = "vendors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    legal_name = Column(String(255), nullable=False)
    domain = Column(String(255), unique=True, nullable=False)
    industry = Column(SQLEnum(Industry), nullable=False)
    criticality = Column(SQLEnum(Criticality), default=Criticality.MEDIUM)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    incidents = relationship("IncidentDB", back_populates="vendor")
    risk_scores = relationship("RiskScoreDB", back_populates="vendor")

class IncidentDB(Base):
    __tablename__ = "incidents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    type = Column(SQLEnum(IncidentType), nullable=False)
    severity = Column(Float, nullable=False) # 0.0 to 10.0
    description = Column(Text, nullable=False)
    evidence_ids = Column(JSON, default=list) # List of Evidence UUIDs
    detected_at = Column(DateTime, nullable=False)
    
    vendor = relationship("VendorDB", back_populates="incidents")

class RiskScoreDB(Base):
    __tablename__ = "risk_scores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    dimension = Column(SQLEnum(RiskDimension), nullable=False)
    value = Column(Float, nullable=False) # 0 to 100
    confidence = Column(Float, nullable=False) # 0.0 to 1.0
    reasoning_trace = Column(Text, nullable=False)
    calculated_at = Column(DateTime, default=datetime.utcnow)
    
    vendor = relationship("VendorDB", back_populates="risk_scores")

class AuditLogDB(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=True)
    action = Column(String(255), nullable=False)
    actor = Column(String(255), nullable=False) # e.g., "Agent:Research" or "User:Admin"
    metadata = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.utcnow)
