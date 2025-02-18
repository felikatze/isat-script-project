import bs4, json, os, re
from alive_progress import alive_bar # pip install alive-progress

# pages on the site to ignore and not search through
ignored_pages = re.compile(r"(about|index|not_found|portraits|test|thanks|(overview|sasasap)\/[\w-]*)\.html")

def write_json_to_file(path: str, data):
    with open(path, "wb") as file:
        file.write(json.dumps(data, indent=4, ensure_ascii=False).encode("utf8"))



def generate_filelist() -> list[str]:
    print("generating filelist")
    filelist = []
    for root, dirs, files in os.walk("public"):
        for file in files:
            if file.endswith(".html"):
                filelist.append(os.path.join(root, file))
    return filelist

def generate_filecontent(filelist: list[str] = None) -> dict[str, bs4.element.ResultSet[bs4.Tag]]:
    if not filelist:
        filelist = generate_filelist()
    print("generating filecontent")
    filecontent = {}
    for file in filelist:
        with open(file, encoding="utf-8") as f:
            soup = bs4.BeautifulSoup(f.read(), "html5lib")
            filecontent[file] = soup.select(".dialogue-line") # get all the dialogue lines in the file
    return filecontent
        
def write_lines_json():
    filecontent = generate_filecontent()
    print('doing things')
    pages = {}
    for file in filecontent:
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

    with open("raw_site_lines.json", "w", encoding="utf-8") as outfile:
        json.dump(pages, outfile, indent=4)

def clean_game_lines():
    with open("Translations.json", encoding="utf-8") as file:
        game_translations_file: dict = json.load(file)

    main_pattern = re.compile(r"(\\(m\[(v([smioblhkq](np)?|(wo)?man||nb|kid|sc|tuto|cg)|clear|wait|rb|choice(var|space)|wish(on|off))\]|!\\|!|\.|\||\^|>|<|(reset)?shake|wave|{|}|v\[\d+?\]|n<.+?>|fi|i\[\d+?\]|ls(on|off|piv?\[\d+?\])|bustClear\[\d+?,\d+?\]))|m\[wait\]", flags=re.IGNORECASE)
    dot_pattern = re.compile(r"\\m\[dot\]")
    newline_pattern = re.compile(r"<br>\n|<br>|\n|\r")
    
    game_lines = []
    
    for original_english_line in game_translations_file["msg"]:
        original_japanese_line = game_translations_file["msg"][original_english_line]["Japanese"]
        
        new_english_line = re.sub(main_pattern, '', original_english_line)
        new_japanese_line = re.sub(main_pattern, '', original_japanese_line)
        
        new_english_line = re.sub(dot_pattern, '...', new_english_line)
        new_japanese_line = re.sub(dot_pattern, '...', new_japanese_line)
        
        new_english_line = re.sub(newline_pattern, ' ', new_english_line)
        new_japanese_line = re.sub(newline_pattern, '', new_japanese_line)
        
        
        if new_english_line or new_japanese_line: # if at least one of them isn't an empty stirng
            line = {"og_en": original_english_line, "en": new_english_line, "og_jp": original_japanese_line, "jp": new_japanese_line}
            game_lines.append(line)
    
    write_json_to_file("game_lines.json", game_lines)

def clean_site_lines():
    with open("raw_site_lines.json", encoding="utf-8") as file:
        site_lines_file: dict = json.load(file)
        
    newline_pattern = re.compile(r"(\n )?<br\/>(\n )?|\n ?")
    tag_pattern = re.compile(r"<.+?>")
        
    for page in site_lines_file:
        if not re.match(ignored_pages, page):
            for line in site_lines_file[page]:
                try:
                    line["dialogue_clean"] = re.sub(newline_pattern, '', line["dialogue"])
                    line["dialogue_clean"] = re.sub(tag_pattern, '', line["dialogue_clean"])
                except KeyError:
                    line["dialogue"] = ""
                    line["dialogue_clean"] = ""
                    
    write_json_to_file("site_lines.json", site_lines_file)
        
def associate_lines():
    with open("game_lines.json", encoding="utf-8") as file:
        game_lines: list[dict[str, str]] = json.load(file)
    
    with open("site_lines.json", encoding="utf-8") as file:
        site_lines: dict[str, list[dict[str, str]]] = json.load(file)
        
    total_matches = {}
    for page in site_lines:
        if not re.match(ignored_pages, page):
            print(f"page {page}")
            matches = {}
            no_matches = {}
            with alive_bar(len(site_lines[page])) as bar:
                for test_site_line in site_lines[page]: # for every site line (dict)
                    try:
                        # print(f"  checking {test_site_line['dialogue_clean']}")
                        
                        this_matches = []
                        for test_game_line in game_lines: # for every game line (dict)
                            if test_site_line["dialogue_clean"] == test_game_line["en"]: # if the cleaned up site and game lines are the same
                                
                                this_matches.append({
                                    "clean": test_site_line["dialogue_clean"],
                                    "site": {
                                        "raw": test_site_line["dialogue"],
                                        "page": page,
                                        "index": site_lines[page].index(test_site_line)
                                    },
                                    "game": {
                                        "en_raw": test_game_line["og_en"],
                                        "jp": test_game_line["jp"],
                                        "jp_raw": test_game_line["og_jp"],
                                        "index": game_lines.index(test_game_line)
                                    }
                                })
                        if this_matches:
                            matches[test_site_line["dialogue_clean"]] = this_matches
                            # print(f"    matches found")
                        else:
                            # print(f"    no matches found")
                            no_matches[test_site_line["dialogue_clean"]] = {
                                "clean": test_site_line["dialogue_clean"],
                                "raw": test_site_line["dialogue"],
                                "page": page,
                                "index": site_lines[page].index(test_site_line)
                                }
                        bar()
                    except KeyError:
                        bar()
                        continue
                
                total_matches[page] = {}
                total_matches[page]["matches"] = matches
                total_matches[page]["no_matches"] = no_matches
    
    write_json_to_file("line_associations.json", total_matches)
        
def associate_lines_for_page(page_path: str):
    with open("game_lines.json", encoding="utf-8") as file:
        game_lines: list[dict[str, str]] = json.load(file)
    
    with open("site_lines.json", encoding="utf-8") as file:
        site_lines: dict[str, list[dict[str, str]]] = json.load(file)
        
    lines = site_lines[page_path]
    
    """
    thing = [
        {
            "en_raw": "original site line",
            "en_clean": "cleaned up site line",
            "jp_raw": "original japanese game line" OR ["list of all original japanese game line matches"],
            "jp_clean": "cleaned up japanese game line" OR ["list of all cleaned up japanese game line matches"]
        }
    ]
    """
        
    data = [{"en_raw": line["dialogue"], "en_clean": line["dialogue_clean"]} for line in lines]
    
    for line in data:
        en_clean = line["en_clean"]
        matches = []
        if en_clean:
            for test_game_line in game_lines:
                if en_clean == test_game_line["en"]:
                    matches.append((test_game_line["og_jp"], test_game_line["jp"]))
        if matches:
            if len(matches) == 1:
                line["jp_raw"] = matches[0][0]
                line["jp_clean"] = matches[0][1]
            else:
                line["jp_raw"] = [match[0] for match in matches]
                line["jp_clean"] = [match[1] for match in matches]
        else:
            line["jp_raw"] = None
            line["jp_clean"] = None
            
    write_json_to_file("line_associations/" + page_path.removesuffix(".html").replace("/", "_") + ".json", data)
    
def generate_page_line_associations():
    filelist = []
    for file in generate_filelist():
        file = file.removeprefix("public\\").replace("\\", "/")
        if not re.match(ignored_pages, file):
            filelist.append(file)
    
    with alive_bar(len(filelist)) as bar:
        for file in filelist:
            associate_lines_for_page(file)
            bar()
            
generate_page_line_associations()