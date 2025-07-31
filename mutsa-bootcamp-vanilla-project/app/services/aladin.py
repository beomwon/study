# from config.settings import settings
import requests

# aladin_api_key = settings.ALADIN_API_KEY

# body{
#   “books”: {
#     “title”: string,
#     “imageUrl”: string,
#     “isbn13”: string
#   }[]
# }

def get_bestseller_book_list():
    books = []
    aladin_api_key = "ttbbeomwon1115001"
    # 알라딘 API는 한 번에 50권씩만 반환하므로 4번 요청
    for start in [1, 51, 101, 151]:
        url = (
            f"https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey={aladin_api_key}"
            f"&QueryType=Bestseller&MaxResults=50&Start={start}&SearchTarget=Book&output=js&Version=20131101&Cover=Big"
        )
        resp = requests.get(url)
        if resp.status_code == 200:
            data = resp.json()
            items = data.get("item", [])
            books.extend({
                "title": item.get("title", ""),
                "imageUrl": item.get("cover", ""),
                "isbn13": item.get("isbn13", "")
            } for item in items if item.get("isbn13"))
        else:
            continue
    return books

def get_book_info(isbn13: str):
    url = (
        f"https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey={aladin_api_key}"
        f"&ItemIdType=ISBN13&ItemId={isbn13}&output=js&Version=20131101"
    )
    resp = requests.get(url)
    if resp.status_code == 200:
        data = resp.json()
        item = data.get("item", {})
        if type(item) is list:
            item = item[0]
        return {
            "title": item.get("title", ""),
            "imageUrl": item.get("cover", ""),
            "author": item.get("author", ""),
            "totalPage": item.get("subInfo", {}).get("itemPage", 0),
            "description": item.get("description", "")
        }
    else:
        return None

if __name__ == "__main__":
    bestseller_books = get_bestseller_book_list()
    print(bestseller_books) 

    # book_info = get_book_info("9791191114768")
    # print(book_info)
