from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import pandas as pd
from io import BytesIO


# 수집 원하는 양만큼 (더보기) 버튼 클릭하여 상세페이지 링크 수집 [selenium]
def selenium_crawler(query, count):
    try:
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        options.add_argument("no-sandbox")
        options.add_argument("disable-dev-shm-usage")
        options.add_argument("single-process")
        driver = webdriver.Chrome(options=options)

        driver.get(f"https://www.nytimes.com/search?query={query}")

        results = []
        articles = []

        # 원하는 개수가 나올때 까지 more button 클릭
        while len(articles) < count:
            print("-")
            articles = driver.find_elements(
                By.CSS_SELECTOR, 'li[data-testid="search-bodega-result"]'
            )
            if len(articles) >= count:
                break
            try:
                driver.find_element(
                    By.CSS_SELECTOR, 'button[data-testid="search-show-more-button"]'
                ).click()
            except:
                print(f"더보기 버튼이 없음 현재 발견된 데이터만 수집, 발견 기사 : {len(articles)}개")
                break

        # 기사 링크 주소 수집
        for article in articles:
            results.append(
                article.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
            )

            # 현재까지 수집한 결과 개수 확인
            current_count = len(results)
            print(f"현재까지 수집한 결과 개수: {current_count}")

            # count에 도달하면 종료
            if current_count >= count:
                break

        # 브라우저 닫기
        driver.quit()

        return results

    finally:
        driver.quit()


# 전체 실행
def crawl_to_excel(query, count):
    # 기사 스크랩
    scraps = []
    urls = selenium_crawler(query, count)

    # 스크랩된 기사 (상세 페이지 내 데이터 수집)
    for url in urls:
        scraps.append(bs4_crawler(url))

    # 스크랩된 기사 번역 처리
    # translationToKr(scraps)

    # 엑셀 export
    return export_to_excel(scraps, query)


# 상세페이지내 제목, 기사, 글쓴이 내용 수집 [bs4]
def bs4_crawler(url):
    scrapData = {}
    try:
        # URL에서 페이지 내용을 가져옴
        parsedUrl = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(urlopen(parsedUrl), "html.parser")

        # 기사 제목 가져오기
        title = soup.select_one("h1").text.strip()

        # 기사 내용 가져오기
        content = ""
        paragraphs = soup.select("article p")
        for paragraph in paragraphs:
            content += paragraph.text + "\n"

        # 기사 작성자 가져오기 (작성자 정보가 있는 경우에만)
        author = soup.select_one("article span a")
        author = author.text.strip() if author else "작성자 정보 없음"

        # 결과 출력 또는 반환
        scrapData = {
            "title": title,
            "content": content,
            "author": author,
        }

        return scrapData

    except Exception as e:
        print(f"에러 발생: {e}")


# 엑셀 파일로 export [pandas]
def export_to_excel(scraps, query):
    # pandas의 DataFrame으로 변환
    df = pd.DataFrame(scraps)

    # Excel 파일로 내보내기
    excel_output = BytesIO()
    df.to_excel(excel_output, index=False, sheet_name=query)
    excel_output.seek(0)
    return excel_output


# # 전체 실행
# def crawl_to_excel(query, count):
#     # 기사 스크랩
#     scraps = []
#     urls = selenium_crawler(query, count)

#     # 스크랩된 기사 (상세 페이지 내 데이터 수집)
#     for url in urls:
#         scraps.append(bs4_crawler(url))

#     # 엑셀 (잠시 비활성화)
#     return export_to_excel(scraps, query)


# 전체 실행
def play_to_crawler(query, count):
    print(f"[클롤링 시작] 기사 스크랩을 시작하도록 하겠습니다.")
    print(f"수집 키워드 : {query}")
    print(f"수집 기사수 : {count}")

    # 기사 스크랩
    scraps = []
    urls = selenium_crawler(query, count)

    # 스크랩된 기사 (상세 페이지 내 데이터 수집)
    for url in urls:
        scraps.append(bs4_crawler(url))

    print(f"[크롤링 종료] 기사 스크랩을 종료하도록 하겠습니다.")
    return scraps
