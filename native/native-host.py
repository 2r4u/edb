import re, json, os, struct, sys, time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

#set regex patterns and file directory
dp1="\d/\d"
dp2="\d/\d\d"
directory="txt-calendars/"

def send_message(encoded_message):
    # Converts dictionary into string containing JSON format.
    # Write message size.
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()


def encode_message(message_content):
    encoded_content = json.dumps(json.dumps(message_content)).encode("utf-8")
    encoded_length = struct.pack('=I', len(encoded_content))
    return {'length': encoded_length, 'content': struct.pack(str(len(encoded_content))+"s",encoded_content)}

def get_message():

    # use buffer to get bytes
    raw_length = sys.stdin.buffer.read(4)


    #raise ValueError(raw_length)

    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode("utf-8")
    return json.loads(message)
        

def scrape(link):
    
    # import pandas as pd

    service = Service(executable_path="chromedriver.exe")
    options = webdriver.ChromeOptions()
    options.add_experimental_option("prefs", {
    "download.default_directory": "C:\\Users\\2r4u6\\Documents\\apcs\\edb\\native\\txt-calendars",
    "download.prompt_for_download":False
    })

    driver = webdriver.Chrome(service=service, options=options)
    prevLetter=""
    for i,letter in enumerate(link):
        if prevLetter=="d" and letter=="/":
            id = link[i+1:len(link)-5]
            break
        else:
            prevLetter=letter
    calendarLink="https://docs.google.com/document/export?format=txt&id="+id
    # driver.get(calendarLink)
    time.sleep(3)
    parse()
    #use this link:https://docs.google.com/document/u/1/export?format=txt + the id of the doc you want to download

def parse():
    #loop through txt files
    for filename in os.listdir(directory):
        if filename[len(filename)-4:]==".txt":
            calendarDict={}
            path="txt-calendars/"
            #loop to format and record calendar in dictionary
            with open(path+filename) as calendar:
                record=False
                key=""
                content=""
                for line in calendar:
                    ln =re.sub("[^\x00-\x7F]+","",line)
                    if not len(ln) - len(ln.lstrip())>0:
                        if record:
                            record=False
                            calendarDict[key]=content.strip()
                            key=""
                            content=""
                        if re.match(dp1,ln[0:4]):
                            key=ln.strip()
                            record=True
                        elif re.match(dp2,ln[0:5]):
                            key=ln.strip()
                            record=True
                    elif record:
                        content+=ln.strip()+" "
            #dumps the formatted calendar into a json file wiht the same name
            with open("json-calendars/%s.json" % os.path.splitext(filename)[0], "w") as jsonfile:
                json.dump( calendarDict, jsonfile)
            
            send_message(encode_message(calendarDict))

while True:
    msg =get_message()
    # with open("output.json", "w") as file:
    #     file.write(msg)
    send_message(encode_message(msg))