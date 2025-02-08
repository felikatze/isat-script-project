import bs4
import json
import os.path


allPublicSubdirectoryPageURIs = [os.path.join(dirpath,f) for (dirpath, dirnames, filenames) in os.walk("public") for f in filenames]
parsed_dialogue_lines = []
for uri in allPublicSubdirectoryPageURIs:

    if uri.split('.')[1] != "html":
        continue
    print(uri)
    file = open(uri, "r", encoding="utf8")
    parsed_html = bs4.BeautifulSoup(file.read(), features="html.parser")
    pageTitle = parsed_html.find('title').text
    print(pageTitle)

    for dh in parsed_html.body.findAll('span', attrs={'class', 'dialogue-head'}):
        dh.decompose()

    dialogue_lines = parsed_html.body.findAll(True, attrs={'class', 'dialogue-line', 'dialogue-option-only'})
    dialogue_lines_linebreak_parsed = []

    for br in parsed_html.body.findAll('br'):
        br.replace

        
    for br in parsed_html.body.findAll('br'):
        br.replaceWith("\n")

    for line in dialogue_lines:
        if(not "\n" in line):
            
            dialogue_lines_linebreak_parsed.append(line.text.strip())
            continue
        splitLines = str(line.text.strip()).split("\n")
        for sl in splitLines:
            dialogue_lines_linebreak_parsed.append(sl)

    past_lines = []
    for line in dialogue_lines_linebreak_parsed:
        element_number = 1
        element_number = sum(line in s for s in past_lines) + 1
        past_lines.append(line)
        parsed_dialogue_lines.append([uri.removeprefix("public"), line, pageTitle, element_number])
    print(dialogue_lines_linebreak_parsed)


        

json_object = json.dumps(parsed_dialogue_lines, indent=4)
with open("public/dialogue-lines.json", "w", encoding="utf8") as outfile:
    outfile.write(json_object)