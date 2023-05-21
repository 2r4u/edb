import re
import json
dp1="\d/\d"
dp2="\d/\d\d"
calendarDict={}
with open("calendars\PC2223 Student Calendar.txt") as calendar:
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

with open("calendar.json", "w") as jsonfile:
    json.dump( calendarDict, jsonfile)