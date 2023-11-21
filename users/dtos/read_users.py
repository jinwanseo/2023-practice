from pydantic import BaseModel
from common.dtos.search_keyword import SearchKeywordInput
from common.dtos.search_date import SearchDateInput


class ReadUsersInput(SearchDateInput, SearchKeywordInput):
    pass
