from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
# import pandas as pd

service = Service(executable_path="chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_experimental_option("prefs", {
  "download.default_directory": "C:\\Users\\2r4u6\\Documents\\apcs\\edb\\native\\calendars",
  "download.prompt_for_download":False
})

driver = webdriver.Chrome(service=service, options=options)


# site="https://sites.google.com/pleasantonusd.net/biology-fewster/home"

# driver.get(site)

# content = driver.page_source
# soup = BeautifulSoup(content, "html.parser")
# with open("%s.txt" %site[len(site)-20], "w", encoding='utf-8') as text_file:
#     text_file.write(soup.prettify())

# calendarLink =[item["data-embed-open-url"] for item in soup.find_all() if "data-embed-open-url" in item.attrs][0]
# print(calendarLink)
calendarLink="https://docs.google.com/document/d/1AwFI1BD0pUJygVVUk2-rtC93HKBxQWuKA6tdknMq2p8"
#driver.get(calendarLink)
time.sleep(5)

#use this link:https://docs.google.com/document/u/1/export?format=txt + the id of the doc you want to download