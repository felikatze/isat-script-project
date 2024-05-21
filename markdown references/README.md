# markdown references

hey! i (gold)'ve been making a bunch of markdown files using [obsidian](https://obsidian.md) in order to have easier references to what different things mean, like variables, switches, items, and stuff like that.

some of the information covered in the spreadsheets is also covered in these files. use whichever works best for you and your use case!

> [!WARNING]
> keep in mind that these pages will contain spoilers for the entire game!

# contribution guide

in order to make these tables, i'm using the plugin [advanced tables](https://github.com/tgrosinger/advanced-tables-obsidian) - either use that, or follow the same syntax when contributing.

make sure all items are included, including empty ones! they should all be numbered as XXXX., ones not under headers should be h1, ones under \[--THESE HEADERS--\] should be h2, and ones under -THESE HEADERS- should be h3. empty items should be h6.

don't put descriptions under empty items and headers (unless they have a description built-in), but put descriptions under everything else where possible, no matter how self explanatory the item's name is.

notate notes as  you would in html: `<!-- like this -->`

> [!NOTE]
> there are exceptions! some headers aren't formatted as the header that they are, for example

```md
# 0001. VariableWithoutHeader

this is a variable

# 0002. \[--HEADER--\]

## 0003. VariableUnderHeader

| column 1 | column 2                                                |
| -------- | ------------------------------------------------------- |
| 1        | this is also a variable                                 |
| 2        | except this one has a table                             |
| 3        | notice how the it looks like a grid even in raw text?   |
| 4        | that's what the advanced tables plugin on obsidian does |

## 0004. -HEADER-

### 0005. VariableUnderTwoHeaders

make sure to look at the currently existing pages for examples!
<!-- this is a note! you can't see this unless looking at the raw content of the file -->

###### 0006.
```