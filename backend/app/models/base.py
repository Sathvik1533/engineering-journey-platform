from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    # In SQLAlchemy 2.0, declarative models subclass DeclarativeBase.
    # This automatically registers subclass models in Base.metadata.
    pass
