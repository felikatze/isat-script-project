the plugins are complicated oh stars this is gonna be painful

# text

this is based on usage in the game. some of these have the potential to do more things, but i'm simplifying their meanings here to fit how isat uses them as to not overcomplicate things

| code | meaning | plugin |
| ---- | ------- | ------ |
| `\v[n]` | replaced by the value of the nth variable | `YEP_MessageCore` |
| `\c[n]` | draw text in the nth color | `YEP_MessageCore` |
| `\{` | set font size to 35 | `YEP_MessageCore` |
| `\}` | set font size to 20 | `YEP_MessageCore` |
| `\.` | waits for 250 milliseconds (0.25 seconds) | `YEP_MessageCore` |
| `\\|` | waits for 1 second | `YEP_MessageCore` |
| `\!` | waits for input | `YEP_MessageCore` |
| `\>text\<` | display the text between `\>` and `\<` immediately | `YEP_MessageCore` |
| `\^` | automatically move to next command | `YEP_MessageCore` |
| `\n<x>` | name box where `x` is the string it displays | `YEP_MessageCore` |
| `<br>` | line break | `YEP_MessageCore` |
| `\oc[n]` | sets the outline color to the nth color | `YEP_MessageCore` |
| `\ow[n]` | sets the outline width to n | `YEP_MessageCore` |
| `\fs[n]` | sets the font size to n | `YEP_MessageCore` |
| `\fb` | toggles boldness | `YEP_MessageCore` |
| `\fi` | toggles italics | `YEP_MessageCore` |
| `\i[n]` | shows the nth icon | `YEP_MessageCore` |
| `\lson` | letter sounds on | `YEP_X_ExtMesPack1` |
| `\lsoff` | letter sounds off | `YEP_X_ExtMesPack1` |
| `\lspi[n]` | sets the letter sound pitch to n | `YEP_X_ExtMesPack1` |
| `\lspiv[n]` | sets the variance of the letter sound pitch to n | `YEP_X_ExtMesPack1` |
| `\lsi[n]` | sets how many letters should be skipped between letter sounds (interval) | `YEP_X_ExtMesPack1` |
| `\shake` | makes text shake | `SRD_ShakingText` |
| `\wave` | makes text wave | `SRD_ShakingText` |
| `\resetshake` | reset text shake/wave | `SRD_ShakingText` |

## macros

macros are defined in `YEP_X_MessageMacros1`

### `\m[slide]`

evaluates to `\bustSlideIn[0,4]`

- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[clear]`

evaluates to `\bustClear[0,0]\lspi[90]\lson`

clears the dialogue sprite and resets the letter sound pitch

- instantly clears the dialogue sprite (`\bustClear[0,0]`)
- changes the letter sounds pitch to 90 (`\lspi[90]`)
- turns on letter sounds (`\lson`)

### `\m[wait]`

evaluates to `\lsoff\|\lson`

waits 1 second

- turns off letter sounds (`\lsoff`)
- waits 1 second (`\|`)
- turns on letter sounds (`\lson`)

### `\m[sec]`

evaluates to `\lsoff\.\.\lson`

waits half a second

- turns off letter sounds (`\lsoff`)
- waits 0.25 seconds (`\.`)
- waits 0.25 seconds (`\.`)
- turns on letter sounds (`\lson`)

### `\m[dot]`

evaluates to `.\..\lsoff\.\.\lson.`

shows "..." with increasing time between each dot

- shows the text "." (`.`)
- waits 0.25 seconds (`\.`)
- shows the text "." (`.`)
- turns off letter sounds (`\lsoff`)
- waits 0.25 seconds (`\.`)
- waits 0.25 seconds (`\.`)
- turns on letter sounds (`\lson`)
- shows the text "." (`.`)

### `\m[vi]`

evaluates to `\lspi[60]\lsoff\lson\bustSlideIn[0,4]`

isabeau's voice (changes pitch to 60)

- change letter sounds pitch to 60 (`\lspi[60]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[vb]`

evaluates to `\lspi[130]\lsoff\lson\bustSlideIn[0,4]`

bonnie's voice (changes pitch to 130)

- change letter sounds pitch to 130 (`\lspi[130]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[vm]`

evaluates to `\lspi[100]\lsoff\lson\bustSlideIn[0,4]`

mirabelle's voice (changes pitch to 100)

- change letter sounds pitch to 100 (`\lspi[100]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[vo]`

evaluates to `\bustSlideIn[0,4]\lsoff\lson\lspi[50]`

odile's voice (changes pitch to 50)

- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- change letter sounds pitch to 50 (`\lspi[50]`)

### `\m[vs]`

evaluates to `\lsoff\lspi[90]\bustSlideIn[0,4]\lson`

siffrin's voice (changes pitch to 90)

- turns off letter sounds (`\lsoff`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)
- turns on letter sounds (`\lson`)

### `\m[vk]`

evaluates to `\lspi[40]\lspiv[10]\lsoff\lson\bustSlideIn[0,4]`

the king's voice (changes pitch to 40 and variance to 10)

- change letter sounds pitch to 40 (`\lspi[40]`)
- change letter sounds pitch variance to 10 (`\lspiv[10]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[smalltext]`

evaluates to `\fs[18]`

sets font size to 18

- sets font size to 18 (`\fs[18]`)

### `\m[vkid]`

evaluates to `\bustClear[0,0]\lsoff\lson\lspi[130]\lson`

general kid voice (changes pitch to 130)

- clear dialogue sprite (`\bustClear[0,0]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- change letter sounds pitch to 130 (`\lspi[130]`)
- turns on letter sounds (`\lson`) (again)

### `\m[vwoman]`

evaluates to `\bustClear[0,0]\lspi[100]\lson`

general woman voice (chanes pitch to 100)

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 100 (`\lspi[100]`)
- turns on letter sounds (`\lson`)

### `\m[vman]`

evaluates to `\bustClear[0,0]\lspi[60]\lson`

general man voice (chanes pitch to 60)

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 60 (`\lspi[60]`)
- turns on letter sounds (`\lson`)

### `\m[vnb]`

evaluates to `\bustClear[0,0]\lspi[90]\lson`

general nonbinary voice (chanes pitch to 90)

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- turns on letter sounds (`\lson`)

### `\m[vinp]`

evaluates to `\bustClear[0,0]\lspi[60]\n<\i[152]  \v[298]  >`

isabeau's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 60 (`\lspi[60]`)
- show namebox (`\n<\i[152]  \v[298]  >`)
    - icon 152
    - two spaces
    - variable 298
    - two spaces

### `\m[vbnp]`

evaluates to `\bustClear[0,0]\lspi[130]\n<\i[150]  \v[300]  >`

bonnie's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 130 (`\lspi[130]`)
- show namebox (`\n<\i[150]  \v[300]  >`)
    - icon 150
    - two spaces
    - variable 300
    - two spaces

### `\m[vmnp]`

evaluates to `\bustClear[0,0]\lspi[100]\n<\i[154]  \v[297]  >`

mirabelle's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 100 (`\lspi[100]`)
- show namebox (`\n<\i[154]  \v[297]  >`)
    - icon 154
    - two spaces
    - variable 297
    - two spaces

### `\m[vonp]`

evaluates to `\bustClear[0,0]\lspi[50]\n<\i[153]  \v[299]  >`

odile's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 50 (`\lspi[50]`)
- show namebox (`\n<\i[153]  \v[299]  >`)
    - icon 153
    - two spaces
    - variable 299
    - two spaces

### `\m[vsnp]`

evaluates to `\bustClear[0,0]\lspi[90]`

siffrin's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 90 (`\lspi[90]`)

### `\m[vknp]`

evaluates to `\bustClear[0,0]\lspi[40]\lspiv[10]\n<\v[314]>`

the king's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 40 (`\lspi[40]`)
- change letter sounds pitch variance to 10 (`\lspiv[10]`)
- show namebox (`\n<\v[314]>`)
    - variable 314

### `\m[vl]`

evaluates to `\lspi[90]\lspiv[40]\lsoff\lson\bustSlideIn[0,4]`

loop's voice (sets pitch to 90 and variance to 40)

- change letter sounds pitch to 90 (`\lspi900]`)
- change letter sounds pitch variance to 40 (`\lspiv[40]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[vlnp]`

evaluates to `\bustClear[0,0]\lspi[90]\lspiv[40]\lsoff\lson\n<\i[155]  \v[316]  >`

loop's voice + name box

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- change letter sounds pitch variance to 40 (`\lspiv[40]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- show namebox (`\n<\i[155]  \v[316]  >`)
    - icon 155
    - two spaces
    - variable 316
    - two spaces

### `\m[rb]`

evaluates to `\lspiv[0]`

resets pitch variance to 0

- sets letter sound pitch variance to 0 (`\lspiv[0]`)

### `\m[choicevar]`

evaluates to `\lsoff\>\v[15]\lson\<\v[11]\!\`

- turns off letter sounds (`\lsoff`)
- start show instantly (`\>`)
- variable 15 (`\v[15]`)
- turns on letter sounds (`\lson`)
- end show instantly (`\<`)
- variable 11 (`\v[11]`)
- wait for input (`\!`)
- escape the next character, likely a space (`\`)

### `\m[choicewait]`

evaluates to `\lsoff\>\v[15]\lson\<\m[wait]\^`

- turns off letter sounds (`\lsoff`)
- start show instantly (`\>`)
- variable 15 (`\v[15]`)
- turns on letter sounds (`\lson`)
- end show instantly (`\<`)
- waits 1 second (`\m[wait]`)
- move to next command (`\^`)

### `\m[choicespace]`

evaluates to `\lsoff\>\v[15]\lson\<`

- turns off letter sounds (`\lsoff`)
- start show instantly (`\>`)
- variable 15 (`\v[15]`)
- turns on letter sounds (`\lson`)
- end show instantly (`\<`)

### `\m[vsc]`

evaluates to `\>\lspi[90]\lsoff\bustSlideIn[0,4]\^\lson`

- start show instantly (`\>`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- turns off letter sounds (`\lsoff`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)
- move to next command (`\^`)
- turns on letter sounds (`\lson`)

### `\m[vtuto]`

evaluates to `\bustClear[0,0]\lspi[90]\lspiv[40]\lsoff\lson`

tutorial (loop)'s voice

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- change letter sounds pitch variance to 40 (`\lspiv[40]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)

### `\m[vh]`

evaluates to `\bustSlideIn[0,4]\lsoff\lson\lspi[60]`

head housemaiden's voice

- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- change letter sounds pitch to 60 (`\lspi[60]`)

### `\m[WishOn]`

evaluates to `\oc[11]\ow[3]`

turns on wish text

- sets outline color to color 11 (`\oc[11]`)
- sets outline width to 3 (`\ow[3]`)

### `\m[WishOff]`

evaluates to `\oc[15]`

turns off wish text

- sets outline color to color 15 (`\oc[15]`)

### `\m[vhnp]`

evaluates to `\lsoff\lson\lspi[60]\n<  \v[315]  >`

head housemaiden's voice + name box

- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- change letter sounds pitch to 60 (`\lspi[60]`)
- show namebox (`\n<  \v[315]  >`)
    - two spaces
    - variable 315
    - two spaces

### `\m[vcg]`

evaluates to `\lspi[140]\lspiv[40]\lsoff\lson\bustSlideIn[0,4]`

- change letter sounds pitch to 140 (`\lspi[140]`)
- change letter sounds pitch variance to 40 (`\lspiv[40]`)
- turns off letter sounds (`\lsoff`)
- turns on letter sounds (`\lson`)
- slides in the dialogue sprite with a duration of 4 (what unit???) (`\bustSlideIn[0,4]`)

### `\m[vq]`

evaluates to `\bustClear[0,0]\lspi[90]\lson`

- clear dialogue sprite (`\bustClear[0,0]`)
- change letter sounds pitch to 90 (`\lspi[90]`)
- turns on letter sounds (`\lson`)