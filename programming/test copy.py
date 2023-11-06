from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import time

driver = webdriver.Chrome()
driver.get("https://www.youtube.com/")

time.sleep(3)

#검색어 창을 찾아 search 변수에 저장
search = driver.find_element(By.XPATH, '//*[@id="search"]')

#search 변수에 저장된 곳에 값을 전송
search.send_keys('hello')
# search.send_keys(Keys.ENTER)

time.sleep(3)
