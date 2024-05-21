# 0001. Loop \#

number of loops, not including fake loops. incremented by 1 at the start of each loop.

# 0002. ACT\<\<CanBeSeen\>\>

act number

| value | start trigger (colloquial)      | start trigger (technical)                             |
| ----- | ------------------------------- | ----------------------------------------------------- |
| 1     | start of game                   | start of game                                         |
| 2     | first death                     | map **086:DeathCorridor > 016:Death**                 | 
| 3     | first time beating the king     |                                                       |
| 4     | the king killing bonnie         |                                                       |
| 5     | head housemaiden can't help you | variable **#0027. !!!LoopQuest = 14** at loop's start |
| 6     | falling                         |                                                       |

# 0003. Random \#

random number. rerolled whenever needed

# 0004. Enemy Troop ID

| value  | meaning                                                |
| ------ | ------------------------------------------------------ |
| 1      | TRISTESSE                                              |
| 2      | DÉPIT, CHAGRIN, PEINE                                  |
| 3      | ANGOISSE, DEUIL                                        |
| 4      | MISÈRE                                                 |
| 5      | THE KING                                               |
| 6      | RANCOEUR, AMERTUME                                     |
| 7      | ANXIÉTÉ                                                |
| 9      | TOURMENT                                               |
| 10     | DÉSESPOIR                                              |
| 11     | NOSTALGIE                                              |
| 12     | CALAMITÉ                                               |
| 13     | ACCABLEMENT, ABATTEMENT                                |
| 14     | BOURDON, SCISSORS HAND x2, PAPER HAND x2, ROCK HAND x2 |
| 15     | DÉTRESSE                                               |
| 666    | MAL DU PAYS                                            |
| 121212 | FRIENDS                                                |
| 363636 | LOOP                                                   | 

# 0005. Item ID

# 0006. Current Position X

# 0007. Current Position Y

# 0008. TeleportUnlocked \#

# 0009. LOOP\<\<fakeloop\# CanBeSeen\>\>

number of fake loops, added onto the number of real loops.
for every loop, at least 1 is added to this variable, making it equal to or greater than the number of real loops. the amount added is determined by variable **#0377. FakeLoopAdded**. <!-- note: link this properly later -->
this is the number shown to the player, whenever the number of loops are mentioned.

this is how the game determines this variable's count:

| conditions                    | value        |
| ----------------------------- | ------------ |
| switch SpecialMilestone is ON | +1           |
| memory of self                | +1           |
| acts 1 and 2                  | +1           |
| act 3                         | random +1..3 |
| act 4                         | random +1..5 | 

# 0010. Self Var EventCheck_0

# 0011. SiffrinDialogue

determines siffrin's dialogue when he can only say one thing but it uses a choice box. checks the language and sets the value accordingly.

# 0012. EnemyMap\#

# 0013. LastUsedItem/Skill

# 0014. SpecialEvent \#\_TL

# 0015. SPACE BEFORE CHOICE

# 0016. Self Var_EventCheck_1

# 0017. Self Var_EventCheck_2

# 0018. Self Var_EventCheck_3

# 0019. Self Var_EventCheck_4

# 0020. Self Var_EventCheck_5

# 0021. \[--STORY SPECIFIC--\]

## 0022. TalkToEveryoneVillageTL

amount of your party you've talked to this loop in dormont

## 0023. TreeWish

which wish you chose at the start of the game. used when referencing it later on to determine dialogue

| value | meaning          |
| ----- | ---------------- |
| 1     | mirabelle's wish |
| 2     | isabeau's wish   |
| 3     | odile's wish     |
| 4     | bonnie's wish    |

## 0024. !!!Kingquest

| value | trigger                                              | 
| ----- | ---------------------------------------------------- |
| 0     | start of act 3                                       |
| 1     | talk to loop at the start of act 3                   |
| 2     | first time asking the king all three intro questions |
| 3     | read craftonomy book for time craft                  |
| 4     | "So you're using Time Craft?"                        |
| 5     | look at the newspaper                                |
| 6     | look at the star window                              |
| 7     | "What should I remember?"                            |
| 8     | diary                                                |
| 9     | mirror picture                                       |
| 10    | "Where are you from?" (say it)                       |
| 11    | meadow post say it                                   |
| 12    | "Let's stop fighting." (bonnie)                      |
| 13    | meadow freakout post bonnie                          |
| 14    | talk to loop about wish craft                        |

## 0025. TalkToEveryoneFinalRoomTL

## 0026. SawSafeRoomEvent_TL

## 0027. !!!LoopQuest

| value       | trigger                                                                                                              | 
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| 1           | talk to loop for the first time in act 3                                                                             |
| 2<br>3<br>4 | ask the king intro questions<br>read craftonomy book<br>talk to head housemaiden first time after starting loopquest |
| 5           | read craftonomy book after talking to head housemaiden, wake up in meadow after talking to head housemaiden          |
| 6           | loop asks to hang out                                                                                                |
| 7           | hang out with loop                                                                                                   |
| 8           | read journal with a star on the cover (king room)                                                                    |
| 9           | talk to loop after reading that book                                                                                 |
| 10          | read storage room book                                                                                               |
| 11          | read book in secret library                                                                                          |
| 12          | look at wish spreadsheet after asking about dormont's wishes                                                         |
| 13          | talk to loop                                                                                                         |
| 14          | start act 5                                                                                                          |

###### 0028.

# 0029. CanFindSkillNow

# 0030. !!!ACT5\_UntrustEnds

# 0031. MandatoryMonstersBeaten\#\_TL

# 0032. SavePointAppears\_AL

# 0033. \[--FRIENDQUEST--\]

## 0034. !!!FriendsQuestAL

## 0035. Miraquest_AL

## 0036. Odilequest_TL

## 0037. Bonniequest_TL

## 0038. Bonniefoods_AL

## 0039. BonnieListening_AL

## 0040. Isaquest_AL

# 0041. \[--VILLAGE--\]

## 0042. It'sARibbon!\_AL

## 0043. isa!!!!!\_TL

## 0044. QQQ_IsaWon'tTouchYou_AL

## 0045. LoopQuestionsIntro_AL

## 0046. NameboxName

name in the namebox during dialogue. set as needed.

## 0047. QQQ_ChateauCastle_AL

## 0048. ChangeGodBlessing_TL

###### 0049.

## 0050. odileintro_AL

## 0051. bonnieintro_AL

## 0052. isaintro_AL

## 0053. QQQ_mirabellefan_AL

## 0054. LoopConvoSeenThisLoop?

## 0055. CurrentLoopConvo\#

## 0056. LoopConvosSkipped\#

## 0057. GivenFlower_TL

## 0058. QQQ_MakeHimSayIt_AL

## 0059. QQQ_MakeHimSayItFriend_TL

## 0060. AskedChangeGodBlessing\#\_AL

## 0061. QQQ_TimesFished\#

## 0062. ChateauCastleIssue\#

###### 0063.

###### 0064.

###### 0065.

###### 0066.

###### 0067.

###### 0068.

###### 0069.

# 0070. \[--HOUSE--\]

## 0071. KeysKnowledge_AL

## 0072. Floor1_OpenedDoors_TL

## 0073. Floor2_OpenedDoors_TL

## 0074. Floor3_OpenedDoors_TL

## 0075. KeyLoopbackKnowledge_AL

## 0076. Floor2_AdminRock_TL

## 0077. Floor1_Tears_TL

## 0078. Floor2_Tears_TL

## 0079. Floor3_Tears_TL

## 0080. Floor1_Rock_AL

## 0081. Floor1_Events_TL

## 0082. Floor2_Events_TL

## 0083. Floor3_Events_TL

## 0084. PotionJoke_TL

## 0085. FirstEncounterTuto_AL

## 0086. CheckAdminRoom_AL

## 0087. Floor2_TearsChoice_TL

## 0088. Bosses_AL

## 0089. QQQ_KeyKnife_AL

## 0090. QQQ_BondingEarrings_AL

## 0091. LockedRoomHouseFL1_TL

## 0092. LockedRoomHouseFL3_TL

## 0093. CoinFlip_TL

## 0094. QQQ_BombQuest_AL

## 0095. LockedRoomHouseFL2_TL

###### 0096.

###### 0097.

###### 0098.

###### 0099.

###### 0100.

# 0101. \[--DEATH REASONS--\]

## 0102. Banana Death \#

number of banana deaths.

## 0103. Monster Death \#

number of deaths to a sadness.

## 0104. King Death \#

number of deaths to the king.

## 0105. Tears Death \#

number of tear deaths.

## 0106. HHM Reset \#

number of times talking to the head housemaiden sent you back to the start. (with or without friendquests?)

## 0107. SpecialEnd \#

## 0108. FirstTrap Death \#

number of deaths to the if-you-feel-safe-it-activates-o-trap.

## 0109. Pineapple Death \#

number of deaths to eating pineapple.

## 0110. Suicide Death \#

number of suicides.

## 0111. FriendquestResets\#

number of times talking to the head housemaiden during friendquest loops sent you back to the start.

###### 0112.

###### 0113.

###### 0114.

###### 0115.

###### 0116.

###### 0117.

###### 0118.

###### 0119.

###### 0120.

# 0121. \[--OPTIONS/TELEPORT--\]

## 0122. ArrowSelector

## 0123. ArrowSelector X

## 0124. ArrowSelector Y

## 0125. JustTeleported \#

## 0126. CurrentPosition

represents your current  position in the current loop.

<!-- note: be more specific in the table -->

| value | location | 
| ----- | -------- |
| 1     | meadow   |
| 2     | floor 1  |
| 3     | floor 2  |
| 4     | floor 3  |
| 5     | the king |
| 6     | the end  |

## 0127. TitleActPicture# (PERSISTENT)

determines the picture on the title screen.

<!-- note: be more specific in the table -->

| value | trigger     |
| ----- | ----------- |
| 2     | start act 2 |
| 3     | start act 3 |
| 4     | start act 4 |
| 5     | start act 5 |
| 6     | start act 6 | 

## 0128. MemoriesOwned\#

## 0129. TeleportSelector1

## 0130. TeleportSelector2

## 0131. KeySelector

## 0132. KeySelector X

## 0133. KeySelector Y

## 0134. LoopResetSwitches

## 0135. SavePointCode

## 0136. SavedEquipment

## 0137. TextSpeed

## 0138. TextPosition X

## 0139. TextPosition Y

## 0140. MemoriesIcon

## 0141. PlaceName

## 0142. ArrowSelectorMath

## 0143. \#MemoriesNeededToTeleport

## 0144. TeleportText

## 0145. TextTeleport:WithDoorsOpened?

## 0146. MemoriesBattle \#

## 0147. MemoriesConflict \#

## 0148. MemoriesTutorial_AL

## 0149. SifAgiUp

## 0150. IsaAgiUp

## 0151. MiraAgiUp

## 0152. MemoryOverflow

## 0153. Math

###### 0154.

###### 0155.

###### 0156.

###### 0157.

###### 0158.

###### 0159.

###### 0160.

# 0161. \[--BATTLE--\]

## 0162. BonnieAction

## 0163. TutoTurn\#\_TL

## 0164. TutoPoints\#\_TL

## 0165. BombEnemyTickTock

## 0166. CurrentAtk

## 0167. Atk1

## 0168. Atk2

## 0169. Atk3

## 0170. Turn \#

number of turns that have passed (0-indexed? 1-indexed?)

## 0171. battleimg1

## 0172. battleimg2

## 0173. battleimg3

## 0174. battleimg4

## 0175. battleimg5

## 0176. Atk4

## 0177. Atk5

## 0178. EnemiesDead\#

## 0179. Combo?

## 0180. FinalBlow

# 0181. \[--SAVE CODE CORNER--\]

## 0182. -Floor1 (start)-

### 0183. Items_F1S

### 0184. IsaEXP_F1S

### 0185. MiraEXP_F1S

### 0186. OdileEXP_F1S

###### 0187.

###### 0188.

###### 0189.

###### 0190.

###### 0191.

## 0192. -Floor1 (done)-

### 0193. Items_F1D

### 0194. IsaEXP_F1D

### 0195. MiraEXP_F1D

### 0196. OdileEXP_F1D

###### 0197.

###### 0198.

###### 0199.

###### 0200.

## 0201. -Floor2 (start)-

### 0202. Items_F2S

### 0203. IsaEXP_F2S

### 0204. MiraEXP_F2S

### 0205. OdileEXP_F2S

###### 0206.

###### 0207.

###### 0208.

###### 0209.

###### 0210.

## 0211. -Floor2 (done)-

### 0212. Items_F2D

### 0213. IsaEXP_F2D

### 0214. MiraEXP_F2D

### 0215. OdileEXP_F2D

###### 0216.

###### 0217.

###### 0218.

###### 0219.

###### 0220.

## 0221. -Floor3 (start)-

### 0222. Items_F3S

### 0223. IsaEXP_F3S

### 0224. MiraEXP_F3S

### 0225. OdileEXP_F3S

###### 0226.

###### 0227.

###### 0228.

###### 0229.

###### 0230.

## 0231. -Floor3 (done)-

### 0232. Items_F3D

### 0233. IsaEXP_F3D

### 0234. MiraEXP_F3D

### 0235. OdileEXP_F3D

###### 0236.

###### 0237.

###### 0238.

###### 0239.

###### 0240.

## 0241. -king-

### 0242. Items_FK

### 0243. IsaEXP_FK

### 0244. MiraEXP_FK

### 0245. OdileEXP_FK

###### 0246.

## 0247. -CURRENT-

### 0248. Items_CURRENT

### 0249. IsaEXP_CURRENT

### 0250. SifEXP_CURRENT

### 0251. MiraEXP_CURRENT

### 0252. IsaEXP_CURRENT

### 0253. OdileEXP_CURRENT

###### 0254.

###### 0255.

###### 0256.

###### 0257.

###### 0258.

###### 0259.

###### 0260.

# 0261. \[--PROFILE MENU--\]

## 0262. SifLevel

## 0263. MiraLevel

## 0264. IsaLevel

## 0265. OdileLevel

## 0266. BonnieLevel

## 0267. SifExpNextLvl

## 0268. MiraExpNextLvl

## 0269. IsaExpNextLvl

## 0270. OdileExpNextLvl

## 0271. Jackpot_imgX

## 0272. Jackpot_img1Y

## 0273. Jackpot_img2Y

## 0274. Jackpot_img3Y

## 0275. Jackpot_img4Y

## 0276. Jackpot_img5Y

## 0277. SecretSkillATK

## 0278. SiffrinAgi

## 0279. OdileAgi

## 0280. MiraAgi

# 0281. \[--TEXT CHANGE--\]

## 0282. SilverCoin

text for the silver coin in the menu

| act  | value                                                       |
| ---- | ----------------------------------------------------------- |
| 1, 2 | Some change you got from buying a croissant.                |
| 3, 4 | A nice silver coin that has followed you even through time. |
| 5    | A coin.                                                     |
| 6    | Your coin. There’s only one like it in the Universe.        |

## 0283. friend/ally

changes how the party is addressed in sentences, usually in skill descriptions.
references the act, and then variable **#0357. friend ally family** <!-- note: link this properly later -->

| reference | value         |
| --------- | ------------- |
| act  = 5  | actor         |
| v357 = 0  | friend        |
| v357 = 1  | ally          | 
| v357 = 2  | family member |

## 0284. friends/allies

changes how the party is addressed in sentences, usually in skill descriptions.
references the act, and then variable **#0357. friend ally family** <!-- note: link this properly later -->

| reference | value          |
| --------- | -------------- |
| act  = 5  | actors         |
| v357 = 0  | friends        |
| v357 = 1  | allies         |
| v357 = 2  | family members | 

## 0285. a friend/an ally

changes how the party is addressed in sentences, usually in skill descriptions.
references the act, and then variable **#0357. friend ally family** <!-- note: link this properly later -->

| reference | value           |
| --------- | --------------- |
| act  = 5  | an actor        |
| v357 = 0  | a friend        |
| v357 = 1  | an ally         |
| v357 = 2  | a family member | 

## 0286. !\\.

changes between ending sentences with "!" or "." depending on the act.

| act | value |
| --- | ----- |
| ≤2  | !     |
| >2  | .     | 

## 0287. ReminderNote

text for the reminder note in the menu

| loop | value                                                                                         |
| ---- | --------------------------------------------------------------------------------------------- |
| ≤2   | A note Mirabelle wrote for you and your sieve-like brain.<br>\[Press \v\[376\] to interact!\] |
| >2   | A note Mirabelle wrote for you.<br>But you know what to do.                                   | 
<!-- note: link this properly later -->

## 0288. Key 3-4

## 0289. TarotCard

text for the drawn card in the menu

## 0290. Snacks

text for the eternal snacks in the menu. references the switch **RE_ateeternalsnacks** <!-- note: link this properly later, when the switches page exists -->

| switch | value                                     |
| ------ | ----------------------------------------- |
| OFF    | Wh-- How did those snacks get here?!      |
| ON     | A bunch of snacks given to you by Bonnie. | 

## 0291. MemoryOfSkirmish

text for the memory of skirmish in the menu

| act | value                           |
| --- | ------------------------------- |
| 1   | Pew! Bam! Kapow! Easy-peasy!    |
| 2   | Not gonna be done anytime soon. |
| ≥3  | Too many to count.              |

## 0292. GiftFormirabelle

text for the fanmail in the menu. references the switch **QQQ_OpenedMirabellesGift_TL** <!-- note: link this properly later, when the switches page exists -->

| switch | value                                             |
| ------ | ------------------------------------------------- |
| OFF    | A gift for Mirabelle. It's lovingly wrapped.      |
| ON     | A gift for Mirabelle. It can't be gifted anymore. |

## 0294. UseItem

text when using an item in battle. item name comes immediately after

| act | value                 |
| --- | --------------------- |
| ≥5  | You use a             |
| <5  | Bonnie runs in with a | 

## 0295. FriendquestPrompts

## 0296. "time"

## 0297. "mirabelle"

## 0298. "isabeau"

## 0299. "odile"

## 0300. "bonnie"

# 0301. \[--SAVE ITEMS--\]

## 0302. SaveItem

## 0303. SourTonicArray

## 0304. SuperSourArray

## 0305. CraftedWaterArray

## 0306. PepperArray

## 0307. GingerArray

## 0308. ThymeArray

## 0309. SweetArray

## 0310. SuperSweetArray

## 0311. SaltyArray

## 0312. CompareItemValue

# 0313. \[MORE TEXT\]

## 0314. "the king"

## 0315. "the hhm"

## 0316. "loop"

## 0317. "attack"

## 0318. "guard"

## 0319. "button"

## 0320. Isaagi

# 0321. \[--LITTLE THINGS--\]

## 0322. OdileWeaponNotice

## 0323. SifAgiChange

## 0324. IsaAgiChange

## 0325. PillarBrokenOrNot

## 0326. StatueCount_TL

## 0327. LoopNothingToSay

## 0328. LoopLastConvo

## 0329. ChangeGodFace

## 0330. BarrelCount_AL

number of barrels you've interacted in all loops.

## 0331. BarrelCount_TL

number of barrels you've interacted with in this loop.

## 0332. QQQ_SifGhostSeen_TL

number of ghosts you've seen in this loop.

## 0333. TriedKillingFriend_AL

## 0334. LoopDaggerConvo

## 0335. PillarCount_AL

number of pillars you've interacted with in all loops.

## 0336. PillarCount_TL

number of pillars you've interacted with in this loop.

## 0337. QQQ_SifGhostSeen_AL

number of ghosts you've seen in all loops.

## 0338. SilverCoinHelp

## 0339. CalledLoop \#

## 0340. SawForgetNamesConvo_AL

# \[--DIALOGUE THINGS--\]

## 0342. FireflyIsa

## 0343. FinishedAct2_AL

## 0344. ReadtheColorBook \#

## 0345. EnemyDistract

the action text of enemies when they do nothing for a turn

## 0346. LoopWhatToDoAct2

## 0347. MeadowNapTaker\#

## 0348. LoopTalkCount_AL

## 0349. HumanQuota\#\_AL

number of times you've walked past everyone in the garden room

## 0350. BumpIntoTable\#\_AL

number of times you've bumped into the counter in the kitchen

## 0351. Country_Saidit_AL

## 0352. Country_Didn'tSayit_AL

## 0353. GotToTheEnd#times

## 0354. FoundWeaponAgain\#

## 0355. TutoEvents

## 0356. MessedUpType

## 0357. friend ally family

determines which term is used for variables **#0283. friend/ally**, **#0284. friends/allies**, and **#0357. friend ally family**. <!-- note: link these properly later -->

| value      | trigger                                                         | 
| ---------- | --------------------------------------------------------------- |
| 0 (friend) | start of game                                                   |
| 1 (ally)   | first time event **037:FLOOR 2, START > 001:Event** is run |
| 2 (family) | friendquest variant of event **023:THE KING > 008:Event**  |
<!-- note: link these properly later -->
<!-- XXX:MAP > XXX:EVENT -->


## 0358. memoryofvictory

text for the memory of victory in the menu

| act | value                                            |
| --- | ------------------------------------------------ |
| 2   | Victory feels good!!!                            |
| >2  | Victory is meaningless, but it still feels good. | 

## 0359. keyknife description

changes the description of the keyknife/knifekey depending on whether or not it's sharpened

| item     | value                                                                          |
| -------- | ------------------------------------------------------------------------------ |
| knifekey | This KeyKnife currently also moonlights as a KnifeKey. So versatile!           |
| keyknife | This knife should let you cut through the King's hair, but probably just once. |

###### 0360.

# 0361. \[--MORE VARIABLES--\]

## 0362. Self Var_EventCheck_6

## 0363. Self Var_EventCheck_7

## 0364. Self Var_EventCheck_8

## 0365. Self Var_EventCheck_9

## 0366. Self Var_EventCheck_10

## 0367. RandomX

## 0368. RandomY

## 0369. MusicChange_TL

## 0370. TempVarForMath

## 0371. KeyboardorGamepad

## 0372. Damage_Bonniequest

## 0373. Midboss3_Rock

## 0374. Midboss3_Paper

## 0375. Midboss3_Scissors

## 0376. TutoKeys

the name of the key the game wants to refer to in a tutorial, according to your controls.

## 0377. FakeLoopAdded

number of fake loops added in a given loop. randomly rerolled at the start of each loop, so long as it's beyond act 2 and siffrin does not have memory of self equipped.

see **#0009. LOOP\<\<fakeloop CanBeSeen\>\>** for more information. <!-- note: link this properly later -->

## 0378. Turn#(Act5)

## 0379. MiraProfile

changes the text in mirabelle's profile depending on the information you have about the change god. references the switch **RE_changeMiraProfile** <!-- note: link this properly later, when the switches page exists -->

| switch | value                                                                                  |
| ------ | -------------------------------------------------------------------------------------- |
| OFF    | A Housemaiden from the town<br>of Dormont, blessed by<br>the Change God.               | 
| ON     | A Housemaiden from the town<br>of Dormont, thought to be<br>blessed by the Change God. |

###### 0380.

# 0381. \[--MORE QUESTS--\]

## 0382. LoopquesttalktoHHM_AL

## 0383. WeirdPointsVillage_TL

## 0384. WeirdPointsFL1_TL

## 0385. WeirdPointsFL2_TL

## 0386. WeirdPointsFL3_TL

## 0387. LoopFamilyMembersCringe

## 0388. \#timesFastForwarded

## 0389. IntroQuestionsToKing

## 0390. MirasmallQuest

## 0391. OdilesmallQuest

## 0392. WeirdPointsTotal

## 0393. CraftSmells

(yes there's two of these)

## 0394. IsaJoke_AL

## 0395. CraftSmells

(yes there's two of these)

## 0396. LoopFlower

## 0397. LoopConvosActuallyHeard

## 0398. BattledLoopLostWon

###### 0399.

###### 0400.

## 0401. -ACT 5&6-

### 0402. Floor3Loop_Count

### 0403. Floor3Loop_toFloor

### 0404. Floor3Loop_toHallway

### 0405. Floor3Loop_ToStars

### 0406. Floor3Loop_toKey3-2

### 0407. Floor3Loop_toBreakRoom

### 0408. Floor3Loop_toKey3-1

### 0409. Floor3Loop_ToEnd

### 0410. SnackItem

### 0411. IsaLoopCount

### 0412. IsaLoopCount(notlooping)

### 0413. KingSlows

### 0414. LoopDeathCount

### 0415. ItemCheck

###### 0416.

### 0417. "expdoubled"

###### 0418.

###### 0419.

###### 0420.