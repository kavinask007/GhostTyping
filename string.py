with open('string.txt') as f:
    lines = [line.rstrip() for line in f]
finallist=[]
for sentence in lines:
    words=sentence.split(' ')
    for word in words:
        finallist.append(word)
print(finallist)