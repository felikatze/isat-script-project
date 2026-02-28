#y'all don't have to accept this, it's just something for myself
import os, json
from operator import itemgetter
from jsmin import jsmin
liAss = os.listdir("line_associations")
trans = os.listdir("translations")

#sanatize all
for i in range(0,len(trans)-1):
  trans[i] = trans[i].split(".")[0]
for i in range(0,len(liAss)-1):
  liAss[i] = liAss[i].split(".")[0]
  
print("starting")
fiList = []
tFCount1 = 0
tFCount2 = 0
for i in liAss:
  fullCount = 0
  percent = 0.0
  if (i[-5:] == ".json"):
    i = i[:-5]
  file = "line_associations\\" + i + ".json"
  if i in trans:
    file = "translations\\" + i + ".jsonc"
  try:
    with open(file, encoding="utf-8") as f:
      print("loading", file)
      data1 = jsmin(f.read())
      data = json.loads(data1)
      num = 0
      for j in data:
        if (j["checked"] == True):
          num +=1
      fullCount = len(data)
      tFCount1 += num
      tFCount2+=fullCount
      percent = float(num)/float(fullCount)
  except Exception as e:
    print("failed", file, e)
  fiList.append({"name":i,"count":fullCount,"percent":percent})

sortedDataStr = json.dumps(sorted(fiList, key=itemgetter('percent'),reverse=True))
print(float(tFCount1)/float(tFCount2))
with open("results.txt", "w") as f:
  f.write(sortedDataStr.replace("}, {","}\n{"))