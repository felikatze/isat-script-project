import bs4, json, os


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
        
def write_to_file(data):
    with open("text.txt", "w", encoding="utf-8") as f:
        f.write(data)

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
    pages[file] = lines

print("writing")
with open("lines.json", "w", encoding="utf-8") as outfile:
    json.dump(pages, outfile, indent=4)