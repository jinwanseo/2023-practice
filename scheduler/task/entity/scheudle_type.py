from enum import Enum


class ScheduleType(str, Enum):
    INTERVAL = "interval"
    DAILY = "daily"
