import bs4
import json
import os.path


all_public_subdirectory_page_URIs = [os.path.join(dirpath,f) for (dirpath, dirnames, filenames) in os.walk("public") for f in filenames]

parsed_dialogue_lines = []

for uri in all_public_subdirectory_page_URIs:

    if uri.split('.')[-1] != "html":
        continue # skip if it's not an html file
    print(uri)
    
    with open(uri, "r", encoding="utf8") as file:
        parsed_html = bs4.BeautifulSoup(file.read(), features="html.parser")
    
    page_title = parsed_html.find('title').text
    print(page_title)
    
    dialogue_heads = parsed_html.body.findAll('span', attrs={'class', 'dialogue-head'})
    dialogue_lines = parsed_html.body.findAll(True, attrs={'class', 'dialogue-line', 'dialogue-option-only'})
    dialogue_lines_linebreak_parsed = []

    for br in parsed_html.body.findAll('br'):
        br.replace
        
    for br in parsed_html.body.findAll('br'):
        br.replaceWith("\n") # replace <br> with \n

    for line in dialogue_lines:
        line_parser = bs4.BeautifulSoup(str(line), features="html.parser")

        # get expression, if it exists
        possibleExpression = line_parser.find(True, attrs=('class', 'dialogue-expression'))
        expression = possibleExpression.text if possibleExpression else ""

        # get speaker, if it exists
        possibleSpeaker = line_parser.find(True, attrs=('class', 'dialogue-name'))
        speaker = possibleSpeaker.text if possibleSpeaker else ""

        for dialogue_head in line_parser.findAll('span', attrs={'class', 'dialogue-head', 'dialogue-name'}):
            dialogue_head.decompose() # delete all dialogue heads; don't need them anymore
        
        line = line_parser.text
        if not line.strip(): # if the string is just whitespace
            continue # skip to next line
        
        # commenting this out because it's making the search annoying
        # if line[0] == "(" and line[-1] == ")" and speaker == "":
        #     speaker = "Siffrin (Internal Monologue)"
        
        if line[0] == "[" and line[-1] == "]" and speaker == "":
            speaker = "Loop (Tutorial)"

        if "\n" not in line:
            dialogue_lines_linebreak_parsed.append([line.strip(), expression, speaker])
            continue
        
        split_lines = line.strip().split("\n")
        for split_line in split_lines:
            dialogue_lines_linebreak_parsed.append([split_line, expression, speaker])

    past_lines = []
    for line in dialogue_lines_linebreak_parsed:
        element_number = sum(line in s for s in past_lines) + 1
        past_lines.append(line)
        parsed_dialogue_lines.append([
            uri.removeprefix("public"),
            line[0],
            page_title,
            element_number,
            line[1],
            line[2]
        ])

        

json_object = json.dumps(parsed_dialogue_lines, indent=4)
with open("public/dialogue-lines.json", "w", encoding="utf8") as outfile:
    outfile.write(json_object)