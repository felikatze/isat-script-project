import os, sys

def find(t):
  target = t.lower()
  print("start")
  for i in os.listdir():
    if not(".py" in i):
      with open(i, 'r', encoding="utf-8") as f:
        data = f.read().lower()
        if target in data:
          print(i+", "+data[data.index(target)-100:data.index(target)+300])
    
  print("done")

if __name__ == "__main__":
    t = str(sys.argv[1])
    find(t)
  