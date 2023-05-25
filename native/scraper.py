from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
# import pandas as pd

service = Service(executable_path="chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_experimental_option("prefs", {
  "download.default_directory": "C:\\Users\\2r4u6\\Documents\\apcs\\edb\\native\\txt-calendars",
  "download.prompt_for_download":False
})

driver = webdriver.Chrome(service=service, options=options)

calendarLink="https://docs.google.com/document/export?format=txt&id=1JivTyrwnIbi8V23sukPgTewOuND-HTYKLVHc8S3BVSc"
# driver.get(calendarLink)
time.sleep(3)

#use this link:https://docs.google.com/document/u/1/export?format=txt + the id of the doc you want to download