import re
import json
from unidecode import unidecode
dp1="\d/\d"
dp2="\d/\d\d"
calendarDict={}
with open("calendars\PC2223 Student Calendar.txt") as calendar:
    record=False
    key=""
    content=""
    for line in calendar:
        if not len(line) - len(line.lstrip())>0:
            record=False
            calendarDict[key]=content
            key=""
            content=""
            if re.match(dp1,line[0:4]):
                key=line.strip()
                record=True
            elif re.match(dp2,line[0:5]):
                key=line.strip()
                record=True
        elif record:
            content+=unidecode(line.strip())+" "

with open("calendar.json", "w") as jsonfile:
    json.dump( calendarDict, jsonfile)