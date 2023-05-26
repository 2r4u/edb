import re, json, os, struct, sys

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
