from bs4 import BeautifulSoup 
import json
import os.path


allPublicSubdirectoryPageURIs = [os.path.join(dirpath,f) for (dirpath, dirnames, filenames) in os.walk("public") for f in filenames]
print(allPublicSubdirectoryPageURIs)

parsed_dialogue_lines = []
for uri in allPublicSubdirectoryPageURIs:
    print(uri)
    if uri.split('.')[1] != "html":
        continue

    file = open(uri, "r", encoding="utf8")
    parsed_html = BeautifulSoup(file.read(), features="html.parser")

    for dh in parsed_html.body.findAll('span', attrs={'class', 'dialogue-head'}):
        dh.decompose()

    dialogue_lines = parsed_html.body.findAll(True, attrs={'class', 'dialogue-line'})
    dialogue_lines += parsed_html.body.findAll(True, attrs={'class', 'dialogue-option-only'})
    for line in dialogue_lines:
        parsed_dialogue_lines.append([uri.removeprefix("public"), line.text.strip()])
        

json_object = json.dumps(parsed_dialogue_lines, indent=4)
with open("public/dialogue-lines.json", "w", encoding="utf8") as outfile:
    outfile.write(json_object)



