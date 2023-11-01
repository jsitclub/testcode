from bs4 import BeautifulSoup as bs 
import requests
from urllib.request import urlretrieve #추가

html = requests.get('https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1&BestType=Bestseller')
# pprint(html.text)

soup = bs(html.text,'html.parser')

books = soup.find_all('div',{'class':'ss_book_box'})

for book in books:
    title=book.find('a',{'class':'bo3'}).text
    print(title)
    img_src=book.find('img',{'class':'front_cover'})['src']    
    print(img_src)
