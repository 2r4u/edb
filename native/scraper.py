from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
# import pandas as pd

service = Service(executable_path="chromedriver.exe")

driver = webdriver.Chrome(service=service)

# site="https://sites.google.com/pleasantonusd.net/biology-fewster/home"

# driver.get(site)

# content = driver.page_source
# soup = BeautifulSoup(content, "html.parser")
# with open("%s.txt" %site[len(site)-20], "w", encoding='utf-8') as text_file:
#     text_file.write(soup.prettify())

# calendarLink =[item["data-embed-open-url"] for item in soup.find_all() if "data-embed-open-url" in item.attrs][0]
# print(calendarLink)
calendarLink="https://drive.google.com/open?authuser=0&id=1AwFI1BD0pUJygVVUk2-rtC93HKBxQWuKA6tdknMq2p8"
driver.get(calendarLink)

#use this link:https://docs.google.com/document/u/1/export?format=txt + the id of the doc you want to download