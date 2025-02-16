import bs4, json, os, re


def generate_filelist() -> list[str]:
    print("generating filelist")
    filelist = []
    for root, dirs, files in os.walk("public"):
        for file in files:
            if file.endswith(".html"):
                filelist.append(os.path.join(root, file))
    return filelist

def generate_filecontent(filelist: list[str] = generate_filelist()) -> dict[str, bs4.element.ResultSet[bs4.Tag]]:
    print("generating filecontent")
    filecontent = {}
    for file in filelist:
        with open(file, encoding="utf-8") as f:
            soup = bs4.BeautifulSoup(f.read(), "html5lib")
            filecontent[file] = soup.select(".dialogue-line")
    return filecontent
        
def write_lines_json():
    filecontent = generate_filecontent()
    print('doing things')
    pages = {}
    for file in filecontent:
        print(f"doing {file}")
        content = filecontent[file]
        lines = []
        for stuff in content:
            line = {}
            
            speaker = stuff.select(".dialogue-name")
            if speaker:
                line["speaker"] = speaker[0].decode_contents()
                
            head = stuff.select(".dialogue-head")
            if head:
                for element in head:
                    element.decompose()
            dialogue = stuff.decode_contents(indent_level=0).removesuffix('\n')
            if dialogue:
                line["dialogue"] = dialogue
            
            lines.append(line)
        filepath = file.removeprefix("public\\").replace("\\", "/")
        pages[filepath] = lines

    print("writing")

    with open("lines.json", "w", encoding="utf-8") as outfile:
        json.dump(pages, outfile, indent=4)
        


def clean_game_lines():
    with open("Translations.json", encoding="utf-8") as file:
        game_translations_file: dict = json.load(file)

    pattern = re.compile(r"(\\(m\[(v([smioblhkq](np)?|(wo)?man||nb|kid|sc|tuto|cg)|clear|wait|rb|choice(var|space)|wish(on|off))\]|!\\|!|\.|\||\^|>|<|(reset)?shake|wave|{|}|v\[\d+?\]|n<.+?>|fi|i\[\d+?\]|ls(on|off|piv?\[\d+?\])|bustClear\[\d+?,\d+?\]))|m\[wait\]", flags=re.IGNORECASE)
    dot_pattern = re.compile(r"\\m\[dot\]")
    newline_pattern = re.compile(r"<br>\n|<br>|\n|\r")
    
    game_lines = []
    
    for original_english_line in game_translations_file["msg"]:
        original_japanese_line = game_translations_file["msg"][original_english_line]["Japanese"]
        
        new_english_line = re.sub(pattern, '', original_english_line)
        new_japanese_line = re.sub(pattern, '', original_japanese_line)
        
        new_english_line = re.sub(dot_pattern, '...', new_english_line)
        new_japanese_line = re.sub(dot_pattern, '...', new_japanese_line)
        
        new_english_line = re.sub(newline_pattern, ' ', new_english_line)
        new_japanese_line = re.sub(newline_pattern, '', new_japanese_line)
        
        
        if new_english_line or new_japanese_line: # if at least one of them isn't empty
            line = {"og_en": original_english_line, "en": new_english_line, "og_jp": original_japanese_line, "jp": new_japanese_line}
            game_lines.append(line)
    
    with open("game_lines.json", "wb") as file:
        file.write(json.dumps(game_lines, indent=4, ensure_ascii=False).encode("utf8"))

def clean_site_lines():
    with open("raw_site_lines.json", encoding="utf-8") as file:
        site_lines_file: dict = json.load(file)
        
    ignored_pages = re.compile(r"(about|index|not_found|portraits|test|(overview|sasasap)\/\w*)\.html")
    newline_pattern = re.compile(r"(\n )?<br\/>(\n )?|\n ?")
    tag_pattern = re.compile(r"<.+?>")
        
    for page in site_lines_file:
        if not re.match(ignored_pages, page):
            for line in site_lines_file[page]:
                try:
                    line["dialogue_clean"] = re.sub(newline_pattern, '', line["dialogue"])
                    line["dialogue_clean"] = re.sub(tag_pattern, '', line["dialogue_clean"])
                except KeyError:
                    continue
                    
    with open("site_lines.json", "wb") as file:
        file.write(json.dumps(site_lines_file, indent=4, ensure_ascii=False).encode("utf8"))