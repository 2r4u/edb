from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import pandas as pd

service = Service(executable_path="chromedriver.exe")

driver = webdriver.Chrome(service=service)

site="https://sites.google.com/pleasantonusd.net/biology-fewster/home"

driver.get(site)

content = driver.page_source
soup = BeautifulSoup(content, "html.parser")
with open("%s.txt" %site[len(site)-20], "w", encoding='utf-8') as text_file:
    text_file.write(soup.prettify())