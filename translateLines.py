import pyjson5, re

file = "acts_act5_VSFriends"
with open("translations/"+file+".jsonc", 'r', encoding='utf-8') as f:
  text = f.read()
  text = text.replace("\\n ", "")
  text = text.replace("\\n", "")
  text = text.replace("\\t", "")
  data = pyjson5.decode(text)
with open("public/"+"/".join(file.split("_"))+".html", 'r', encoding='utf-8') as f:
  site = f.read()
  site = site.replace(" </span>","</span>")
  #site = site.replace("> ",">")

untouched = site[:site.index("<div class=\"dialogue\">")]
site = site[site.index("<div class=\"dialogue\">"):]
#replace lines
for i in data:
  if not(i['checked']):
    if (input("unchcked line "+i['en_raw']+", abort this?")[0].lower() == 'y'):
      exit(0)
for i in data:
  #try:
  #print(i)
  if (i['jp_raw'] == None):
    continue
  linesEN=[x for x in re.split('(?:<br/?>)|((?<=\))\s(?="))', i['en_raw']) if x is not None] 
  linesJP=[x for x in re.split('(?:<br/?>)|((?<=\))\s(?="))', i['jp_raw']) if x is not None] 
  while (len(linesEN) != len(linesJP)):
    print("mismatch error in",linesEN, linesJP)
    if len(linesJP) < len(linesEN):
      linesEN[0] = linesEN[0] + linesEN.pop(1)
    else:
      linesJP[0] = linesJP[0] + linesJP.pop(1)
  for j in range(len(linesEN)):
    #Tired of constant "multiple detected of (...), replacing first only"
    if linesEN[j] == linesJP[j]:
      continue
    
    #this is to stop !'s in expressions getting mixed up
    count = 0
    firstIndex = 99999
    siteLines = site.split("\n")
    for k in range(len(siteLines)):
      if linesEN[j] in siteLines[k] and not("dialogue-expression" in siteLines[k]):
        count += 1
        firstIndex = min([firstIndex, k])
    
    
    if not(linesJP[j] == None):    
      if count == 0:
        print("!!!!warning, no line detected for " + linesEN[j])
        continue
      if count > 1:
        print("multiple detected of "+linesEN[j]+", replacing first only")
      siteLines[firstIndex] = siteLines[firstIndex].replace(linesEN[j], linesJP[j][:1]+"FLAG_REMOVE_LATER"+linesJP[j][1:], 1)
      site = "\n".join(siteLines)
  #except:
  #  print("Something's wrong with", i)

site = site.replace("FLAG_REMOVE_LATER","")

#replace headers
rebuilder = []
for i in site.split("\n"):
  if "<span class=\"dialogue-name\">" in i:
    i = i.replace("Siffrin", "シフラン")
    i = i.replace("Isabeau", "イザボー")
    i = i.replace("Mirabelle", "ミラベル")
    i = i.replace("Odile", "オディール")
    i = i.replace("Bonnie", "ボニー")
    i = i.replace("Loop", "ルプ")
    i = i.replace("Euphrasie", "ユーフラジー")
    i = i.replace("King", "王")
    i = i.replace("\"What is craft?\"", "「クラフトって？」")
    i = i.replace("???", "？？？")#assuming
    i = i.replace("Beautiful One", "美人さん")
    i = i.replace("Big Boulanger", "背の高いパン屋")
    i = i.replace("Bird", "TODO")
    i = i.replace("Blind One", "ブラインドさん")
    i = i.replace("Bored Librarian", "退屈そうな司書")
    i = i.replace("Castle-Loving One", "城好きさん")
    i = i.replace("Change God", "ウツロイの神")
    i = i.replace("Claude", "クロード")
    i = i.replace("Cool Jeweler", "クールな宝石職人")
    i = i.replace("Cool Wife", "クールな妻")
    i = i.replace("Daydreaming One", "空想さん")
    i = i.replace("Diary", "日記")
    i = i.replace("Drawing Kid", "絵を描く子ども")
    i = i.replace("Drawing kid", "絵を描く子ども")
    i = i.replace("Fishing One", "釣り人さん")
    i = i.replace("Flower Growing One", "園芸家")
    i = i.replace("Frog-Loving Kid", "カエル好きの子ども")
    i = i.replace("Frog-loving kid", "カエル好きの子ども")
    i = i.replace("Handsome Person", "ハンサムさん")
    i = i.replace("Housemaiden and Dog", "侍祭と犬")
    i = i.replace("Housemaiden With Overalls", "オーバーオールの侍祭")
    i = i.replace("Librarian", "司書")
    i = i.replace("Light-Haired Housemaiden", "薄い髪色の侍祭")
    i = i.replace("Locked One", "戸締りさん")
    i = i.replace("Long-Haired Housemaiden", "ロングヘアの侍祭")
    i = i.replace("Mirabelle\'s Friend", "ミラベルの友達")
    i = i.replace("Mirabelle\'s Idol", "ミラベルの憧れの人")
    i = i.replace("Old One", "おばあさん")
    i = i.replace("Running One", "爆走さん")
    i = i.replace("SOMETHING", "得体の知れないもの")
    i = i.replace("Sad Diary", "悲しい日記")
    i = i.replace("Sheep", "羊") #Doesn't actually have a title in game.
    i = i.replace("Short-Haired Housemaiden", "ショートカットの侍祭")
    i = i.replace("Shy Stranger", "恥ずかしがり屋さん")
    i = i.replace("Sky-Loving Kid", "空好きの子ども")
    i = i.replace("Sky-loving kid", "空好きの子ども")
    i = i.replace("Sleepy Person", "おねむさん")
    i = i.replace("Small Boulangère", "背の低いパン屋")
    i = i.replace("Smug One", "気取り屋さん")
    i = i.replace("Story-Loving Shopkeeper", "物語好きの店主")
    i = i.replace("Stressed Housemaiden", "おびえる侍祭")
    i = i.replace("Stylish One", "おしゃれさん")
    i = i.replace("The-One-Who-Was-Given-A-Tutorial Kid", "チュートリアルされ娘")
    i = i.replace("Tutorial Kid", "チュートリアル娘")
    i = i.replace("Unfinished Poem", "未完成の詩")
    i = i.replace("Wizard-Loving Kid", "魔法使いが気になる子ども")
    i = i.replace("\"What is Craft?\"", "\"クラフトとは？\"")
    
  rebuilder.append(i)
site = "\n".join(rebuilder)
site = untouched + site
site = site.replace('href="/style.css"', 'href="/stylejp.css"') # hi it's gold i'm invading your code. i think this should work
site = site.replace('src="/bars.js"', 'src="/barsJ.js"')#
site = site.replace('lang="en"', 'lang="ja"')

#write
try:
  f = open("public/japanese_site/"+"/".join(file.split("_"))+".html", 'w', encoding='utf-8')
except:
  f = open("public/japanese_site/"+"/".join(file.split("_"))+".html", 'x', encoding='utf-8')
f.write(site)