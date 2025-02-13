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
    dialogue_heads = parsed_html.body.findAll('span', attrs={'class', 'dialogue-head'})

    dialogue_lines = parsed_html.body.findAll(True, attrs={'class', 'dialogue-line', 'dialogue-option-only'})
    dialogue_lines_linebreak_parsed = []

    for br in parsed_html.body.findAll('br'):
        br.replace

        
    for br in parsed_html.body.findAll('br'):
        br.replaceWith("\n")

    for line in dialogue_lines:
        lineParser = bs4.BeautifulSoup(str(line), features="html.parser")

        possibleExpression = lineParser.find(True, attrs=('class', 'dialogue-expression'))
        expression = "" if possibleExpression is None else possibleExpression.text

        possibleSpeaker = lineParser.find(True, attrs=('class', 'dialogue-name'))
        speaker = "" if possibleSpeaker is None else possibleSpeaker.text

        for dh in lineParser.findAll('span', attrs={'class', 'dialogue-head', 'dialogue-name'}):
            dh.decompose()
        line = lineParser.text
        if(len(line.strip()) == 0):
            continue
        if(not "\n" in line):
            dialogue_lines_linebreak_parsed.append([line.strip(), expression, speaker])
            continue
        splitLines = str(line.strip()).split("\n")
        for sl in splitLines:
            dialogue_lines_linebreak_parsed.append([sl, expression, speaker])

    past_lines = []
    for line in dialogue_lines_linebreak_parsed:
        element_number = 1
        element_number = sum(line in s for s in past_lines) + 1
        past_lines.append(line)
        parsed_dialogue_lines.append([uri.removeprefix("public"), line[0], pageTitle, element_number, line[1], line[2]])

        

json_object = json.dumps(parsed_dialogue_lines, indent=4)
with open("public/dialogue-lines.json", "w", encoding="utf8") as outfile:
    outfile.write(json_object)