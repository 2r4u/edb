import re
dates = []
with open("calendars\PC2223 Student Calendar.txt") as calendar:
    for line in calendar:
        if not len(line) - len(line.lstrip())>0:
            dates.append(line)

dp ="\d\\\d"
#TODO: use regular expressions to filter dates
print(dates)
for d in dates:
    if re.match(dp,d[0:4]):
        print(d)
