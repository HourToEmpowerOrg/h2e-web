from abc import ABC
from typing import List
from typing import Tuple
from typing import Union
from uuid import UUID

from h2e_api.main.models.BaseModel import db
from flask import g
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Query
from sqlalchemy.orm.exc import NoResultFound


class BaseRepository(ABC):
    model_class = None

    @classmethod
    def get_all(cls) -> List[model_class]:
        query = cls.get_base_query()
        return query.all()

    @classmethod
    def get_one_by_id(cls, id: Union[UUID, str]) -> model_class:
        return cls.get_base_query().filter_by(id=id).first()

    @classmethod
    def get_all_by_ids(
        cls, ids: Union[List[UUID], List[str]], **kwargs
    ) -> List[model_class]:
        query = cls.get_base_query().filter(cls.model_class.id.in_(ids))
        return query.all()

    @classmethod
    def delete_by_id(cls, id: UUID, commit: bool = False) -> None:
        cls.get_base_query().filter_by(id=id).delete(synchronize_session=False)

        if commit:
            db.session.commit()

    @classmethod
    def update_by_id(
        cls, id: Union[str, UUID], fields_for_update: Union[Tuple, List], **kwargs
    ):
        data = {}

        for field in fields_for_update:
            if field in kwargs:
                data[field] = kwargs[field]

        if data:
            cls.get_base_query().filter_by(id=id).update(
                data, synchronize_session="fetch"
            )

            commit = kwargs.get("commit", False)

            if commit:
                try:
                    db.session.commit()
                except SQLAlchemyError as e:
                    db.session.rollback()
                    print(str(e))

    @classmethod
    def get_or_create(cls, defaults=None, **kwargs):
        try:
            return cls.get_base_query().filter_by(**kwargs).one(), False
        except NoResultFound:
            if defaults is not None:
                kwargs.update(defaults)
            try:
                instance = cls.model_class(**kwargs)
                db.session.add(instance)
                db.session.commit()
                return instance, True
            except IntegrityError:
                db.session.rollback()
                return cls.get_base_query().filter_by(**kwargs).one(), False

    @classmethod
    def get_base_query(cls, **kwargs) -> Query:
        return cls.model_class.query

    @classmethod
    def add_flush_commit(cls, model: db.Model, **kwargs):
        add = kwargs.get("add", True)
        flush = kwargs.get("flush", False)
        commit = kwargs.get("commit", False)

        if add or commit or flush:
            db.session.add(model)

        if flush:
            db.session.flush([model])

        if commit:
            db.session.commit()
