from enum import Enum
from enum import auto


class HourToEmpowerEnum(str, Enum):
    """
    Utility enum to subclass from that has the proper instantiation, indexing,
    auto(), and comparison behavior.
    from enum import auto
    class Color(AwesomeEnum):
        RED = auto()
        GREEN = auto()
    Color.RED == 'RED'
    => True
    Color('RED')
    => <Color.RED>
    Color['RED']
    => <Color.RED>
    """

    def __repr__(self):
        return '<%s.%s>' % (self.__class__.__name__, self.name)

    def _generate_next_value_(name, start, count, last_values):
        return name


class UserType(HourToEmpowerEnum):
    STUDENT = auto()
    TUTOR = auto()
    TEACHER = auto()
    ADMIN = auto()
