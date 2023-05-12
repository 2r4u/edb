@echo off
:REG ADD "HKEY_CURRENT_USER\SOFTWARE\Google\Chrome\NativeMessagingHosts\com.edb.scraper" /ve /t REG_SZ /d "C:\Users\2r4u6\Documents\apcs\edb\native\scraper.json" /f
pip install selenium
pip install beautifulsoup4
start scraper.py