@echo off
::pip install selenium
::pip install beautifulsoup4
call scraper.py
python -u txt-parser.py