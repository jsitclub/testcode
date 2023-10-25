from bs4 import BeautifulSoup as bs 
from pprint import pprint
import requests
from urllib.request import urlretrieve #추가

html = requests.get('https://www.hanbit.co.kr/store/store_submain.html')
# pprint(html.text)

soup = bs(html.text,'html.parser')

imgs = soup.find_all('img',{'class':'thumb'})

# print(imgs)

for book in imgs:
    img_src='https://www.hanbit.co.kr'+book['src']
    urlretrieve( img_src , img_src.split('/')[-1]) 
    
