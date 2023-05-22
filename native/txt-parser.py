import re, json, os

#set regex patterns and file directory
dp1="\d/\d"
dp2="\d/\d\d"
directory="txt-calendars/"

#loop through txt files
for filename in os.listdir(directory):
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