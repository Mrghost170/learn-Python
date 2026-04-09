// ============================================================
// PyQuest — Knowledge Battle Data (one per lesson)
// Types: "output" | "fill" | "debug"
// ============================================================

const BATTLES = {

  // ────────────────────────────────────────
  // WORLD 1 — The Awakening
  // ────────────────────────────────────────

  "1-1": {
    type: "output",
    title: "⚔️ Battle: Variables & Assignment",
    xpReward: 15,
    problem: "Look at this code carefully. What does it print? Type the EXACT output — each print on a new line.",
    code:
`hero = "Aria"
level = 7
score = level * 100
is_alive = True

print(hero)
print(level + 3)
print(score)
print(type(is_alive))`,
    answer: "Aria\n10\n700\n<class 'bool'>",
    validAnswers: [
      "Aria\n10\n700\n<class 'bool'>",
      "Aria\r\n10\r\n700\r\n<class 'bool'>"
    ],
    hint: "Remember: level + 3 = 7 + 3. type() shows the class name in angle brackets.",
    steps: [
      { icon: "📦", color: "#00d4ff", title: "Assign hero = 'Aria'", code: `hero = "Aria"`, explain: "The string 'Aria' is stored in the variable called hero." },
      { icon: "🔢", color: "#ff9e7a", title: "Calculate score = level * 100", code: `level = 7\nscore = 7 * 100  # = 700`, explain: "level is 7, so 7 × 100 = 700. This is stored in score." },
      { icon: "🖨️", color: "#c3e88d", title: "print(hero) → 'Aria'", code: `print(hero)   # Aria`, explain: "Prints the value stored in hero — which is 'Aria' (without quotes)." },
      { icon: "➕", color: "#82aaff", title: "print(level + 3) → 10", code: `print(7 + 3)  # 10`, explain: "7 + 3 = 10. Python evaluates the expression first, then prints." },
      { icon: "💡", color: "#a855f7", title: "print(type(is_alive)) → <class 'bool'>", code: `print(type(True))  # <class 'bool'>`, explain: "type() returns the data type. True is a bool, shown as <class 'bool'>." }
    ]
  },

  "1-2": {
    type: "fill",
    title: "⚔️ Battle: Data Types",
    xpReward: 15,
    problem: "Fill in the blanks to complete this code correctly. Each ___ is one expression or keyword.",
    code:
`x = ___        # integer 42
y = ___        # float 3.14
z = ___        # string "hero"
alive = ___    # boolean True

print(type(x)) # <class 'int'>
print(type(y)) # <class 'float'>`,
    blanks: [
      { placeholder: "___  # integer 42",   answer: "42",     validAnswers: ["42"] },
      { placeholder: "___  # float 3.14",   answer: "3.14",   validAnswers: ["3.14"] },
      { placeholder: '___  # string "hero"',answer: '"hero"', validAnswers: ['"hero"', "'hero'"] },
      { placeholder: "___  # boolean True", answer: "True",   validAnswers: ["True"] }
    ],
    hint: "Python integers have no decimal point. Floats do. Strings need quotes. Booleans are True/False (capital T/F).",
    steps: [
      { icon: "🔢", color: "#ff9e7a", title: "Integer: no decimal point", code: `x = 42    # int`, explain: "Integers are whole numbers. No quotes, no decimal point." },
      { icon: "🌊", color: "#00d4ff", title: "Float: has decimal point", code: `y = 3.14  # float`, explain: "Floats have a decimal point. Python automatically uses float type." },
      { icon: "📝", color: "#c3e88d", title: "String: wrapped in quotes", code: `z = "hero"  # str`, explain: "Strings must be in single or double quotes: 'hero' or \"hero\" both work." },
      { icon: "⚡", color: "#a855f7", title: "Boolean: True or False (capital!)", code: `alive = True  # bool`, explain: "Python booleans are True or False — always capitalized. 'true' would be a NameError!" }
    ]
  },

  "1-3": {
    type: "output",
    title: "⚔️ Battle: Strings & Methods",
    xpReward: 15,
    problem: "Predict the EXACT output of this string manipulation code:",
    code:
`spell = "fireball"
hero  = "   Aria   "

print(spell.upper())
print(len(spell))
print(hero.strip())
print(spell.replace("fire","ice"))
print(spell[0:4])`,
    answer: "FIREBALL\n8\nAria\niceball\nfire",
    validAnswers: ["FIREBALL\n8\nAria\niceball\nfire", "FIREBALL\r\n8\r\nAria\r\niceball\r\nfire"],
    hint: "strip() removes leading/trailing spaces. [0:4] is a slice — start at 0, stop before 4.",
    steps: [
      { icon: "🔠", color: "#00d4ff", title: ".upper() → all CAPS", code: `"fireball".upper()  # "FIREBALL"`, explain: "upper() converts every character to uppercase." },
      { icon: "📏", color: "#ff9e7a", title: "len() → counts characters", code: `len("fireball")  # 8\n# f-i-r-e-b-a-l-l = 8 chars`, explain: "len() counts all characters including spaces. 'fireball' has 8." },
      { icon: "✂️", color: "#c3e88d", title: ".strip() → removes spaces", code: `"   Aria   ".strip()  # "Aria"`, explain: "strip() removes whitespace from both ends. The middle is untouched." },
      { icon: "🔄", color: "#a855f7", title: ".replace() → swap 'fire' with 'ice'", code: `"fireball".replace("fire","ice")  # "iceball"`, explain: "replace(old, new) swaps all occurrences of old with new." },
      { icon: "✂️", color: "#f59e0b", title: "Slicing [0:4] → first 4 chars", code: `"fireball"[0:4]  # "fire"\n# index 0,1,2,3 → f,i,r,e`, explain: "[start:stop] — includes start, excludes stop. [0:4] gives characters at index 0,1,2,3." }
    ]
  },

  "1-4": {
    type: "debug",
    title: "⚔️ Battle: User Input & Casting",
    xpReward: 15,
    problem: "This code has a bug — it crashes when the user types '5'. Find and fix it. Type the CORRECTED line 3 only:",
    code:
`name  = input("Enter your name: ")
age   = input("Enter your age: ")
total = age + 10          # ← BUG IS HERE
print(f"{name} will be {total} next year")`,
    bugDescription: "Line 3 crashes with TypeError. input() always returns a string, you can't add a number to a string!",
    answer: "total = int(age) + 10",
    validAnswers: ["total = int(age) + 10", "total = int( age ) + 10", "total=int(age)+10"],
    hint: "Use int() to convert the string from input() into a number before adding.",
    steps: [
      { icon: "🐛", color: "#ef4444", title: "The bug: string + int = TypeError", code: `age = "5"    # input() always gives a string\n"5" + 10     # TypeError! Can't add str + int`, explain: "input() ALWAYS returns a string, even if the user types a number. '5' is text, not a number." },
      { icon: "💡", color: "#f59e0b", title: "Fix: convert with int()", code: `age = input(...)      # "5" (string)\nage_num = int(age)    # 5  (integer)`, explain: "Use int() to convert the string to an integer. Now math works!" },
      { icon: "✅", color: "#22c55e", title: "Corrected line", code: `total = int(age) + 10\n# int("5") + 10 = 5 + 10 = 15`, explain: "Wrap age in int() before adding. Now 5 + 10 = 15 as expected." },
      { icon: "🖨️", color: "#00d4ff", title: "Result", code: `print(f"{name} will be {total} next year")\n# e.g. Aria will be 15 next year`, explain: "The f-string formats name and total into a readable sentence." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 2 — The Decision Dungeon
  // ────────────────────────────────────────

  "2-1": {
    type: "output",
    title: "⚔️ Battle: if / elif / else",
    xpReward: 15,
    problem: "Trace through this code and predict what it prints:",
    code:
`gold = 75
shield = False

if gold > 100:
    print("Rich hero!")
elif gold > 50 and not shield:
    print("Decent gold, no shield")
elif gold > 50:
    print("Decent gold, has shield")
else:
    print("Poor hero")`,
    answer: "Decent gold, no shield",
    validAnswers: ["Decent gold, no shield"],
    hint: "gold=75, so gold > 100 is False. Check the elif — both conditions must be True.",
    steps: [
      { icon: "🔍", color: "#ff6b35", title: "Check: gold > 100", code: `75 > 100  # False → skip this block`, explain: "75 is not greater than 100, so the first if block is skipped." },
      { icon: "⚖️", color: "#f59e0b", title: "Check: gold > 50 and not shield", code: `75 > 50   # True\nnot False # True (shield is False)\nTrue and True  # True → run this!`, explain: "75 > 50 is True. not False (shield=False) is True. Both True → elif runs!" },
      { icon: "🖨️", color: "#22c55e", title: "Print the elif block", code: `print("Decent gold, no shield")`, explain: "Since the elif condition was True, this line prints. The rest are skipped." }
    ]
  },

  "2-2": {
    type: "fill",
    title: "⚔️ Battle: Comparison & Logical Operators",
    xpReward: 15,
    problem: "Complete the conditions so each print statement runs correctly:",
    code:
`x = 8
y = 3

# Should print "yes"
if x ___ 5:
    print("yes")

# Should print "both positive"  
if x > 0 ___ y > 0:
    print("both positive")

# Should print "not equal"
if x ___ y:
    print("not equal")`,
    blanks: [
      { placeholder: "___ 5", answer: "> 5 or >= 5 or > 4", validAnswers: [">", ">=", "> 4", ">4", ">= 5", ">=5", "> 5", ">5"] },
      { placeholder: "___ y > 0", answer: "and", validAnswers: ["and"] },
      { placeholder: "x ___ y:", answer: "!= y:", validAnswers: ["!=", "!= y", "!= y:"] }
    ],
    hint: "8 > 5 is True. For 'both positive' both sides must be True at once. != means 'not equal'.",
    steps: [
      { icon: "🔢", color: "#00d4ff", title: "x > 5: Greater-than check", code: `8 > 5   # True — 8 is greater than 5\n# prints "yes"`, explain: "> checks if left is strictly greater. 8 > 5 is True." },
      { icon: "⚡", color: "#a855f7", title: "'and' requires BOTH sides True", code: `x > 0 and y > 0\n8 > 0 → True\n3 > 0 → True\nTrue and True → True`, explain: "'and' returns True only when BOTH conditions are True. Both 8 and 3 are positive." },
      { icon: "❌", color: "#ef4444", title: "!= means 'not equal'", code: `8 != 3  # True — they are different`, explain: "!= is 'not equal to'. Since 8 ≠ 3, the condition is True." }
    ]
  },

  "2-3": {
    type: "output",
    title: "⚔️ Battle: Nested Conditions",
    xpReward: 15,
    problem: "What does this nested if code output?",
    code:
`rank = "knight"
hp   = 40
mp   = 100

if rank == "knight":
    if hp < 50:
        print("Wounded knight!")
        if mp > 50:
            print("But has mana!")
    else:
        print("Healthy knight!")
else:
    print("Unknown rank")`,
    answer: "Wounded knight!\nBut has mana!",
    validAnswers: ["Wounded knight!\nBut has mana!", "Wounded knight!\r\nBut has mana!"],
    hint: "Each if is checked top-to-bottom. When an outer if is True, Python enters it and checks the inner ifs.",
    steps: [
      { icon: "🔍", color: "#ff6b35", title: "Outer: rank == 'knight'", code: `"knight" == "knight"  # True → enter block`, explain: "The outer if checks rank. It matches 'knight', so we enter this block." },
      { icon: "🩸", color: "#ef4444", title: "Inner: hp < 50", code: `40 < 50  # True → 'Wounded knight!'`, explain: "hp is 40, which is less than 50. Prints 'Wounded knight!'" },
      { icon: "✨", color: "#a855f7", title: "Deepest: mp > 50", code: `100 > 50  # True → 'But has mana!'`, explain: "mp is 100, greater than 50. Prints 'But has mana!' inside the wounded block." },
      { icon: "🖨️", color: "#22c55e", title: "Final output", code: `# Wounded knight!\n# But has mana!`, explain: "Two lines print. The 'else:Healthy knight!' is skipped because hp < 50 was True." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 3 — The Loop Labyrinth
  // ────────────────────────────────────────

  "3-1": {
    type: "output",
    title: "⚔️ Battle: while Loops",
    xpReward: 15,
    problem: "What does this while loop print? One line at a time:",
    code:
`count = 1
while count <= 4:
    print(f"Round {count}")
    count += 1
print("Done!")`,
    answer: "Round 1\nRound 2\nRound 3\nRound 4\nDone!",
    validAnswers: ["Round 1\nRound 2\nRound 3\nRound 4\nDone!", "Round 1\r\nRound 2\r\nRound 3\r\nRound 4\r\nDone!"],
    hint: "The loop runs while count <= 4. count starts at 1 and goes up by 1 each time.",
    steps: [
      { icon: "▶️", color: "#00d4ff", title: "Loop starts: count = 1", code: `count = 1\n1 <= 4  # True → print "Round 1", count = 2`, explain: "count starts at 1. 1 ≤ 4 is True, so the body runs. Prints 'Round 1', then count becomes 2." },
      { icon: "🔄", color: "#a855f7", title: "Iterations 2, 3, 4", code: `2 <= 4 → print "Round 2", count=3\n3 <= 4 → print "Round 3", count=4\n4 <= 4 → print "Round 4", count=5`, explain: "The loop continues printing and incrementing until count reaches 5." },
      { icon: "🛑", color: "#ef4444", title: "count = 5 → loop ends", code: `5 <= 4  # False → exit while loop`, explain: "5 is not ≤ 4, so the while condition fails and the loop exits." },
      { icon: "🖨️", color: "#22c55e", title: "After loop: print 'Done!'", code: `print("Done!")  # runs after loop`, explain: "Code after the loop runs normally. 'Done!' prints once." }
    ]
  },

  "3-2": {
    type: "fill",
    title: "⚔️ Battle: for Loops",
    xpReward: 15,
    problem: "Complete this for loop to print squares of numbers 1 through 5:",
    code:
`# Print: 1, 4, 9, 16, 25
for i in range(___, ___):
    print(i ___ 2)`,
    blanks: [
      { placeholder: "range(___, ___)", answer: "1, 6", validAnswers: ["1, 6", "1,6", "1 , 6"] },
      { placeholder: "i ___ 2", answer: "** 2 or *i", validAnswers: ["**", "** 2", "**2"] }
    ],
    hint: "range(1, 6) gives 1,2,3,4,5. The power operator in Python is **",
    steps: [
      { icon: "🔢", color: "#00d4ff", title: "range(1, 6) generates 1 through 5", code: `range(1, 6)  # 1, 2, 3, 4, 5\n# start=1 (included), stop=6 (excluded)`, explain: "range(start, stop) — stop is NOT included. So range(1,6) gives 1,2,3,4,5." },
      { icon: "⚡", color: "#f59e0b", title: "** is the power (exponent) operator", code: `1**2 = 1\n2**2 = 4\n3**2 = 9\n4**2 = 16\n5**2 = 25`, explain: "** means 'to the power of'. i**2 means i squared." },
      { icon: "🖨️", color: "#22c55e", title: "Output: 1, 4, 9, 16, 25", code: `for i in range(1, 6):\n    print(i**2)\n# 1\n# 4\n# 9\n# 16\n# 25`, explain: "Each iteration squares i and prints the result." }
    ]
  },

  "3-3": {
    type: "output",
    title: "⚔️ Battle: break, continue & pass",
    xpReward: 15,
    problem: "This loop uses break and continue. What exactly does it print?",
    code:
`for i in range(1, 8):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)`,
    answer: "1\n2\n4\n5",
    validAnswers: ["1\n2\n4\n5", "1\r\n2\r\n4\r\n5"],
    hint: "continue skips the rest of the loop body for that iteration. break exits the loop entirely.",
    steps: [
      { icon: "▶️", color: "#00d4ff", title: "i=1,2: print normally", code: `i=1 → print(1)\ni=2 → print(2)`, explain: "No special conditions hit for i=1 or i=2, so they print normally." },
      { icon: "⏭️", color: "#f59e0b", title: "i=3: continue skips print", code: `i=3 → if i==3: continue\n# Jumps to next iteration\n# 3 is NOT printed`, explain: "continue jumps back to the top of the loop. print(3) is never reached." },
      { icon: "▶️", color: "#22c55e", title: "i=4,5: print normally", code: `i=4 → print(4)\ni=5 → print(5)`, explain: "4 and 5 have no special conditions, they print normally." },
      { icon: "🛑", color: "#ef4444", title: "i=6: break exits loop", code: `i=6 → if i==6: break\n# Loop ends immediately\n# 6,7 are NEVER reached`, explain: "break exits the entire for loop. 6 and 7 are never printed." }
    ]
  },

  "3-4": {
    type: "output",
    title: "⚔️ Battle: Nested Loops",
    xpReward: 15,
    problem: "How many times does 'hit' print, and what is the final value of total?",
    code:
`total = 0
for row in range(3):
    for col in range(2):
        total += 1
        print("hit")
print("total:", total)`,
    answer: "hit\nhit\nhit\nhit\nhit\nhit\ntotal: 6",
    validAnswers: ["hit\nhit\nhit\nhit\nhit\nhit\ntotal: 6", "hit\r\nhit\r\nhit\r\nhit\r\nhit\r\nhit\r\ntotal: 6"],
    hint: "Outer loop runs 3 times (0,1,2). Inner loop runs 2 times for each outer iteration. 3 × 2 = ?",
    steps: [
      { icon: "🔄", color: "#00d4ff", title: "Outer loop: 3 iterations (row 0,1,2)", code: `for row in range(3):\n    # runs 3 times`, explain: "range(3) gives 0, 1, 2 — three iterations." },
      { icon: "🔄", color: "#a855f7", title: "Inner loop: 2 iterations per row", code: `    for col in range(2):\n        # runs 2 times per outer iteration`, explain: "range(2) gives 0, 1 — two iterations inside each outer." },
      { icon: "➕", color: "#f59e0b", title: "Total iterations: 3 × 2 = 6", code: `3 rows × 2 cols = 6 total\n# print("hit") runs 6 times\n# total = 6`, explain: "Each inner iteration adds 1 to total and prints 'hit'. 3×2=6 total runs." },
      { icon: "🖨️", color: "#22c55e", title: "After loops: print total", code: `print("total:", 6)\n# total: 6`, explain: "After all nested loops finish, total=6 is printed with its label." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 4 — The Function Fortress
  // ────────────────────────────────────────

  "4-1": {
    type: "output",
    title: "⚔️ Battle: Defining & Calling Functions",
    xpReward: 15,
    problem: "What does this code print? (functions can be called multiple times)",
    code:
`def cast_spell():
    print("⚡ Lightning!")
    print("Damage: 50")

cast_spell()
print("---")
cast_spell()`,
    answer: "⚡ Lightning!\nDamage: 50\n---\n⚡ Lightning!\nDamage: 50",
    validAnswers: [
      "⚡ Lightning!\nDamage: 50\n---\n⚡ Lightning!\nDamage: 50",
      "⚡ Lightning!\r\nDamage: 50\r\n---\r\n⚡ Lightning!\r\nDamage: 50"
    ],
    hint: "The function body runs each time you CALL it. def just defines it — doesn't run it.",
    steps: [
      { icon: "📋", color: "#22c55e", title: "def — define but don't run", code: `def cast_spell():\n    print("⚡ Lightning!")\n    print("Damage: 50")\n# Nothing prints yet!`, explain: "def creates the function but doesn't execute it. No output happens here." },
      { icon: "▶️", color: "#00d4ff", title: "First call: cast_spell()", code: `cast_spell()\n# ⚡ Lightning!\n# Damage: 50`, explain: "The first call runs the function body — both print statements execute." },
      { icon: "➖", color: "#f59e0b", title: "print('---') between calls", code: `print("---")\n# ---`, explain: "This is regular code between calls — just prints '---'." },
      { icon: "▶️", color: "#a855f7", title: "Second call: same output again", code: `cast_spell()\n# ⚡ Lightning!\n# Damage: 50`, explain: "Calling again runs the same body — functions are reusable!" }
    ]
  },

  "4-2": {
    type: "fill",
    title: "⚔️ Battle: Parameters & Return Values",
    xpReward: 15,
    problem: "Complete this damage calculator function:",
    code:
`def calculate_damage(___, multiplier):
    damage = base * ___
    ___ damage

result = calculate_damage(30, 3)
print(result)  # Should print: 90`,
    blanks: [
      { placeholder: "(___, multiplier)", answer: "base", validAnswers: ["base"] },
      { placeholder: "base * ___", answer: "multiplier", validAnswers: ["multiplier"] },
      { placeholder: "___ damage", answer: "return", validAnswers: ["return"] }
    ],
    hint: "The first parameter name is the same as the variable used in calculation. Use 'return' to send back the result.",
    steps: [
      { icon: "📥", color: "#00d4ff", title: "Parameter: base receives 30", code: `def calculate_damage(base, multiplier):\n# When called: base=30, multiplier=3`, explain: "Parameters are the input variables. 'base' receives the value 30 from the call." },
      { icon: "➕", color: "#f59e0b", title: "Calculate: base * multiplier", code: `damage = 30 * 3  # = 90`, explain: "The function body multiplies the two parameters: 30 × 3 = 90." },
      { icon: "📤", color: "#22c55e", title: "'return' sends the result back", code: `return damage  # sends 90 back\nresult = calculate_damage(30, 3)\n# result = 90`, explain: "return exits the function and passes the value back to where it was called." }
    ]
  },

  "4-3": {
    type: "output",
    title: "⚔️ Battle: Default & Keyword Arguments",
    xpReward: 15,
    problem: "Default args in action — what does each call print?",
    code:
`def hero_info(name, level=1, role="Warrior"):
    print(f"{name} | Lv.{level} | {role}")

hero_info("Aria")
hero_info("Bolt", 5)
hero_info("Zara", role="Mage")
hero_info("Rex", 10, "Archer")`,
    answer: "Aria | Lv.1 | Warrior\nBolt | Lv.5 | Warrior\nZara | Lv.1 | Mage\nRex | Lv.10 | Archer",
    validAnswers: [
      "Aria | Lv.1 | Warrior\nBolt | Lv.5 | Warrior\nZara | Lv.1 | Mage\nRex | Lv.10 | Archer",
      "Aria | Lv.1 | Warrior\r\nBolt | Lv.5 | Warrior\r\nZara | Lv.1 | Mage\r\nRex | Lv.10 | Archer"
    ],
    hint: "Unprovided params use their default values. Keyword args (role='Mage') can be in any order.",
    steps: [
      { icon: "👤", color: "#00d4ff", title: "hero_info('Aria') — only name given", code: `# level=1 default, role="Warrior" default\nprint("Aria | Lv.1 | Warrior")`, explain: "Only 'Aria' given. level defaults to 1, role defaults to 'Warrior'." },
      { icon: "⬆️", color: "#a855f7", title: "hero_info('Bolt', 5) — level provided", code: `# level=5 overrides default\nprint("Bolt | Lv.5 | Warrior")`, explain: "level=5 overrides its default. role still defaults to 'Warrior'." },
      { icon: "🔑", color: "#f59e0b", title: "hero_info('Zara', role='Mage') — keyword arg", code: `# Skips level (stays at 1)\n# role='Mage' overrides default\nprint("Zara | Lv.1 | Mage")`, explain: "Using role='Mage' as keyword skips level, which keeps its default of 1." },
      { icon: "🏹", color: "#22c55e", title: "hero_info('Rex', 10, 'Archer') — all provided", code: `# All defaults overridden\nprint("Rex | Lv.10 | Archer")`, explain: "All three args provided positionally — no defaults used." }
    ]
  },

  "4-4": {
    type: "debug",
    title: "⚔️ Battle: Variable Scope",
    xpReward: 15,
    problem: "This code throws a NameError. Find the bug and type the corrected function body line:",
    code:
`power = 100

def boost():
    power = power + 50   # ← BUG
    return power

print(boost())`,
    bugDescription: "Python sees 'power =' inside the function and treats power as LOCAL. Then 'power + 50' tries to read it before it's assigned — UnboundLocalError!",
    answer: "global power",
    validAnswers: ["global power", "    global power"],
    hint: "You need to tell Python this 'power' is the global one, not a new local variable. One keyword does this.",
    steps: [
      { icon: "🐛", color: "#ef4444", title: "The bug: Python thinks power is local", code: `def boost():\n    power = power + 50\n    # Python sees "power =" → local var\n    # But reads "power" before assigning\n    # → UnboundLocalError!`, explain: "When Python sees 'power =' inside a function, it assumes power is a LOCAL variable. Reading it before assignment crashes." },
      { icon: "🔑", color: "#f59e0b", title: "Fix: declare 'global power' first", code: `def boost():\n    global power        # ← add this\n    power = power + 50  # now OK\n    return power`, explain: "'global power' tells Python to use the GLOBAL power variable, not create a local one." },
      { icon: "✅", color: "#22c55e", title: "Result after fix", code: `power = 100\ndef boost():\n    global power\n    power = power + 50\n    return power\nprint(boost())  # 150`, explain: "With 'global power', the function reads and modifies the global variable successfully. Prints 150." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 5 — The Data Structures Vault
  // ────────────────────────────────────────

  "5-1": {
    type: "output",
    title: "⚔️ Battle: Lists",
    xpReward: 15,
    problem: "Trace this list code step by step. What does it print?",
    code:
`items = ["sword", "shield", "potion"]
items.append("bow")
items.remove("shield")
items[0] = "dagger"

print(items)
print(len(items))
print(items[-1])`,
    answer: "['dagger', 'potion', 'bow']\n3\nbow",
    validAnswers: ["['dagger', 'potion', 'bow']\n3\nbow", "['dagger', 'potion', 'bow']\r\n3\r\nbow"],
    hint: "Work through each operation one at a time on paper. append adds to end, remove deletes by value, [0]= replaces at index 0.",
    steps: [
      { icon: "📋", color: "#f59e0b", title: "Start: items = ['sword','shield','potion']", code: `items = ["sword", "shield", "potion"]`, explain: "Three items in order. Index 0='sword', 1='shield', 2='potion'." },
      { icon: "➕", color: "#00d4ff", title: "append('bow') → add to end", code: `items.append("bow")\n# ['sword','shield','potion','bow']`, explain: "append always adds to the END of the list." },
      { icon: "🗑️", color: "#ef4444", title: "remove('shield') → delete by value", code: `items.remove("shield")\n# ['sword','potion','bow']`, explain: "remove searches for 'shield' and deletes the FIRST match." },
      { icon: "✏️", color: "#a855f7", title: "items[0] = 'dagger' → replace at index 0", code: `items[0] = "dagger"\n# ['dagger','potion','bow']`, explain: "Assignment at index 0 replaces 'sword' with 'dagger'." },
      { icon: "🖨️", color: "#22c55e", title: "Print results", code: `print(items)    # ['dagger','potion','bow']\nprint(len(items))  # 3\nprint(items[-1])   # 'bow' (last item)`, explain: "Final list has 3 items. items[-1] is the last item, 'bow'." }
    ]
  },

  "5-2": {
    type: "output",
    title: "⚔️ Battle: Tuples & Sets",
    xpReward: 15,
    problem: "What does this code print?",
    code:
`coords = (10, 20, 30)
skills = {"fire", "ice", "fire", "wind", "ice"}

print(coords[1])
print(len(skills))
print(type(coords))`,
    answer: "20\n3\n<class 'tuple'>",
    validAnswers: ["20\n3\n<class 'tuple'>", "20\r\n3\r\n<class 'tuple'>"],
    hint: "Set automatically removes duplicates. Tuple index starts at 0, so [1] is the second element.",
    steps: [
      { icon: "📍", color: "#00d4ff", title: "coords[1] → second element = 20", code: `coords = (10, 20, 30)\ncoords[0] = 10\ncoords[1] = 20\ncoords[2] = 30`, explain: "Tuples are indexed like lists. Index 1 is the second item, which is 20." },
      { icon: "🔢", color: "#a855f7", title: "len(skills) → 3 unique items", code: `{"fire","ice","fire","wind","ice"}\n# Duplicates removed automatically\n# → {"fire","ice","wind"} = 3 items`, explain: "Sets remove duplicates. 'fire' appears twice, 'ice' appears twice — both reduced to one each. Only 3 unique values remain." },
      { icon: "📏", color: "#22c55e", title: "type(coords) → <class 'tuple'>", code: `type((10, 20, 30))  # <class 'tuple'>`, explain: "type() shows the data type. Parentheses () create a tuple." }
    ]
  },

  "5-3": {
    type: "fill",
    title: "⚔️ Battle: Dictionaries",
    xpReward: 15,
    problem: "Complete this hero stats dictionary code:",
    code:
`hero = {"name": "Aria", "hp": 200, "mp": 100}

# Get hp value safely (return 0 if missing)
hp = hero.___("hp", 0)

# Add a new key
hero[___] = 50

# Loop through all key-value pairs
for key, val in hero.___():
    print(f"{key}: {val}")`,
    blanks: [
      { placeholder: "hero.___", answer: "get", validAnswers: ["get"] },
      { placeholder: 'hero[___]', answer: '"xp"', validAnswers: ['"xp"', "'xp'", '"level"', "'level'", '"gold"', "'gold'"] },
      { placeholder: "hero.___():", answer: "items", validAnswers: ["items"] }
    ],
    hint: "dict.get(key, default) is safe — no crash if key missing. .items() gives (key, value) pairs.",
    steps: [
      { icon: "🔒", color: "#f59e0b", title: ".get() — safe access with default", code: `hero.get("hp", 0)\n# "hp" exists → returns 200\n# If "hp" missing → returns 0 (safe!)`, explain: ".get(key, default) never crashes. If the key doesn't exist, it returns the default value." },
      { icon: "➕", color: "#00d4ff", title: "hero['xp'] = 50 — add new key", code: `hero["xp"] = 50\n# hero = {"name":"Aria","hp":200,"mp":100,"xp":50}`, explain: "Assigning to a new key adds it to the dictionary." },
      { icon: "🔄", color: "#22c55e", title: ".items() — loop key-value pairs", code: `for key, val in hero.items():\n    print(f"{key}: {val}")\n# name: Aria\n# hp: 200  etc.`, explain: ".items() gives each (key, value) pair as a tuple, which you can unpack directly." }
    ]
  },

  "5-4": {
    type: "output",
    title: "⚔️ Battle: List Comprehensions",
    xpReward: 15,
    problem: "What does this list comprehension code produce?",
    code:
`numbers = [1, 2, 3, 4, 5, 6, 7, 8]

evens   = [n for n in numbers if n % 2 == 0]
doubled = [n * 2 for n in evens]
words   = [f"level{n}" for n in range(1, 4)]

print(evens)
print(doubled)
print(words)`,
    answer: "[2, 4, 6, 8]\n[4, 8, 12, 16]\n['level1', 'level2', 'level3']",
    validAnswers: [
      "[2, 4, 6, 8]\n[4, 8, 12, 16]\n['level1', 'level2', 'level3']",
      "[2, 4, 6, 8]\r\n[4, 8, 12, 16]\r\n['level1', 'level2', 'level3']"
    ],
    hint: "n % 2 == 0 means even. doubled operates on the already-filtered evens list.",
    steps: [
      { icon: "🔢", color: "#f59e0b", title: "Filter evens: n % 2 == 0", code: `[n for n in [1..8] if n%2==0]\n# 2%2=0✅ 4%2=0✅ 6%2=0✅ 8%2=0✅\n# evens = [2, 4, 6, 8]`, explain: "n % 2 == 0 checks divisibility by 2. Only even numbers pass the filter." },
      { icon: "✖️", color: "#a855f7", title: "Double each even: n * 2", code: `[n*2 for n in [2,4,6,8]]\n# 2*2=4, 4*2=8, 6*2=12, 8*2=16\n# doubled = [4, 8, 12, 16]`, explain: "Multiplies each element of evens by 2." },
      { icon: "📝", color: "#00d4ff", title: "String comprehension", code: `[f"level{n}" for n in range(1,4)]\n# n=1: "level1", n=2: "level2", n=3: "level3"\n# words = ['level1','level2','level3']`, explain: "f-strings work inside comprehensions too. range(1,4) gives 1,2,3." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 6 — The OOP Citadel
  // ────────────────────────────────────────

  "6-1": {
    type: "output",
    title: "⚔️ Battle: Classes & Objects",
    xpReward: 15,
    problem: "Predict the output of this OOP code:",
    code:
`class Dragon:
    def __init__(self, name, hp):
        self.name = name
        self.hp   = hp

    def roar(self):
        print(f"{self.name} roars! HP: {self.hp}")

    def take_damage(self, dmg):
        self.hp -= dmg
        print(f"{self.name} takes {dmg} damage!")

d = Dragon("Ignis", 500)
d.roar()
d.take_damage(80)
d.roar()`,
    answer: "Ignis roars! HP: 500\nIgnis takes 80 damage!\nIgnis roars! HP: 420",
    validAnswers: [
      "Ignis roars! HP: 500\nIgnis takes 80 damage!\nIgnis roars! HP: 420",
      "Ignis roars! HP: 500\r\nIgnis takes 80 damage!\r\nIgnis roars! HP: 420"
    ],
    hint: "Each method call uses self. — it refers to the object. take_damage changes self.hp permanently.",
    steps: [
      { icon: "🏗️", color: "#ec4899", title: "__init__ creates the object", code: `d = Dragon("Ignis", 500)\n# d.name = "Ignis"\n# d.hp   = 500`, explain: "__init__ runs when you create an object. self.name and self.hp store the values." },
      { icon: "🐉", color: "#f59e0b", title: "d.roar() → print with current hp", code: `def roar(self):\n    print(f"{self.name} roars! HP: {self.hp}")\n# "Ignis roars! HP: 500"`, explain: "roar() uses self.name and self.hp. Currently hp=500." },
      { icon: "💥", color: "#ef4444", title: "d.take_damage(80) → hp -= 80", code: `self.hp -= 80   # 500 - 80 = 420\n# "Ignis takes 80 damage!"`, explain: "take_damage modifies self.hp permanently. 500 - 80 = 420." },
      { icon: "🐉", color: "#22c55e", title: "d.roar() again → updated hp", code: `# d.hp is now 420\n# "Ignis roars! HP: 420"`, explain: "The second roar() call uses the updated hp=420." }
    ]
  },

  "6-2": {
    type: "fill",
    title: "⚔️ Battle: Inheritance",
    xpReward: 15,
    problem: "Complete the child class that inherits from Character:",
    code:
`class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp   = hp

    def speak(self):
        print(f"I am {self.name}")

class Mage(___):            # inherit Character
    def __init__(self, name, hp, mana):
        ___().__init__(name, hp)   # call parent __init__
        self.mana = mana

    def cast(self):
        print(f"{self.name} casts! Mana: {self.mana}")

m = Mage("Zara", 100, 300)
m.___()    # inherited method
m.cast()`,
    blanks: [
      { placeholder: "class Mage(___)", answer: "Character", validAnswers: ["Character"] },
      { placeholder: "___().__init__", answer: "super", validAnswers: ["super"] },
      { placeholder: "m.___()    # inherited", answer: "speak", validAnswers: ["speak"] }
    ],
    hint: "Pass the parent class name in parentheses. super() gives access to the parent. speak() is defined in Character.",
    steps: [
      { icon: "🧬", color: "#ec4899", title: "class Mage(Character): inherits all", code: `class Mage(Character):\n    # Now Mage has all of Character's methods`, explain: "Putting Character in parentheses makes Mage a CHILD of Character — it inherits everything." },
      { icon: "⬆️", color: "#a855f7", title: "super().__init__() calls parent init", code: `def __init__(self, name, hp, mana):\n    super().__init__(name, hp)\n    # Runs Character.__init__ to set name & hp\n    self.mana = mana  # Mage's extra attribute`, explain: "super().__init__() runs the parent's __init__ to set up shared attributes. Then add Mage-specific ones." },
      { icon: "🗣️", color: "#00d4ff", title: "m.speak() — inherited from Character", code: `m.speak()  # "I am Zara"\n# Method not in Mage, but found in Character`, explain: "Python looks up the class hierarchy. speak() found in Character — it runs!" }
    ]
  },

  "6-3": {
    type: "output",
    title: "⚔️ Battle: Encapsulation & Polymorphism",
    xpReward: 15,
    problem: "What does this polymorphism example print?",
    code:
`class Warrior:
    def attack(self):
        return "⚔️ Sword slash! -40 dmg"

class Mage:
    def attack(self):
        return "🔮 Fireball! -80 dmg"

class Archer:
    def attack(self):
        return "🏹 Arrow shot! -30 dmg"

party = [Warrior(), Mage(), Archer()]
for hero in party:
    print(hero.attack())`,
    answer: "⚔️ Sword slash! -40 dmg\n🔮 Fireball! -80 dmg\n🏹 Arrow shot! -30 dmg",
    validAnswers: [
      "⚔️ Sword slash! -40 dmg\n🔮 Fireball! -80 dmg\n🏹 Arrow shot! -30 dmg",
      "⚔️ Sword slash! -40 dmg\r\n🔮 Fireball! -80 dmg\r\n🏹 Arrow shot! -30 dmg"
    ],
    hint: "All three classes have an attack() method. Python calls the right one based on the actual object type.",
    steps: [
      { icon: "🔐", color: "#ec4899", title: "Same method name, different behavior", code: `Warrior().attack()  # "⚔️ Sword slash..."\nMage().attack()     # "🔮 Fireball..."\nArcher().attack()   # "🏹 Arrow shot..."`, explain: "All three have attack() but each does something different — that's polymorphism!" },
      { icon: "🔄", color: "#00d4ff", title: "Loop calls attack() on each object", code: `party = [Warrior(), Mage(), Archer()]\nfor hero in party:\n    print(hero.attack())\n# Python picks the RIGHT attack() each time`, explain: "Python looks at the ACTUAL type of hero — not just that it has an attack() method." },
      { icon: "🖨️", color: "#22c55e", title: "Output — 3 lines, one per class", code: `# ⚔️ Sword slash! -40 dmg\n# 🔮 Fireball! -80 dmg\n# 🏹 Arrow shot! -30 dmg`, explain: "Each hero.attack() calls that class's version. Three different outputs from one loop." }
    ]
  },

  // ────────────────────────────────────────
  // WORLD 7 — The Final Frontier
  // ────────────────────────────────────────

  "7-1": {
    type: "output",
    title: "⚔️ Battle: File I/O",
    xpReward: 15,
    problem: "What file modes should be used? Fill in: write new file → 'w', read it → 'r', add more data → 'a'. What does the last print output?",
    code:
`# We track what content the file has
# Write phase: creates/overwrites
# with open("log.txt", "w") as f:
#     f.write("Line 1\\n")  → file: "Line 1\\n"

# Append phase: adds to existing
# with open("log.txt", "a") as f:
#     f.write("Line 2\\n")  → file: "Line 1\\nLine 2\\n"

# Read and count lines
lines = ["Line 1", "Line 2"]  # simulated
print(len(lines))
print(lines[0])`,
    answer: "2\nLine 1",
    validAnswers: ["2\nLine 1", "2\r\nLine 1"],
    hint: "'w' creates/overwrites. 'a' appends. 'r' reads. The simulated list has 2 items, index 0 is 'Line 1'.",
    steps: [
      { icon: "📝", color: "#dc2626", title: "Mode 'w' — write (creates/overwrites)", code: `open("log.txt", "w")  # Creates file\nf.write("Line 1\\n")   # File: "Line 1\\n"`, explain: "'w' creates the file if it doesn't exist, or OVERWRITES if it does." },
      { icon: "➕", color: "#f59e0b", title: "Mode 'a' — append (add to end)", code: `open("log.txt", "a")  # Opens existing\nf.write("Line 2\\n")   # Adds to end\n# File now: "Line 1\\nLine 2\\n"`, explain: "'a' never erases existing content — it adds to the end." },
      { icon: "📖", color: "#00d4ff", title: "Mode 'r' — read the content", code: `open("log.txt", "r")\ncontent = f.read()\n# "Line 1\\nLine 2\\n"`, explain: "'r' opens for reading only. f.read() gets all content as a string." },
      { icon: "🖨️", color: "#22c55e", title: "len=2, lines[0]='Line 1'", code: `print(len(lines))  # 2\nprint(lines[0])    # Line 1`, explain: "The list has 2 items. Index 0 is the first: 'Line 1'." }
    ]
  },

  "7-2": {
    type: "output",
    title: "⚔️ Battle: Error Handling",
    xpReward: 15,
    problem: "What does this try/except/finally code print?",
    code:
`def safe_divide(a, b):
    try:
        result = a / b
        print(f"Result: {result}")
    except ZeroDivisionError:
        print("Cannot divide by zero!")
    except TypeError:
        print("Wrong type!")
    finally:
        print("Done.")

safe_divide(10, 2)
safe_divide(5, 0)`,
    answer: "Result: 5.0\nDone.\nCannot divide by zero!\nDone.",
    validAnswers: [
      "Result: 5.0\nDone.\nCannot divide by zero!\nDone.",
      "Result: 5.0\r\nDone.\r\nCannot divide by zero!\r\nDone."
    ],
    hint: "finally ALWAYS runs — even when an exception occurs. 10/2 = 5.0 (always a float in Python 3).",
    steps: [
      { icon: "✅", color: "#22c55e", title: "safe_divide(10, 2) — no error", code: `10 / 2 = 5.0  # success!\nprint("Result: 5.0")\n# finally always runs:\nprint("Done.")`, explain: "10/2 works fine. try block completes. finally runs regardless." },
      { icon: "💥", color: "#ef4444", title: "safe_divide(5, 0) — ZeroDivisionError", code: `5 / 0  # ← ZeroDivisionError!\n# try fails → except ZeroDivisionError catches it\nprint("Cannot divide by zero!")`, explain: "Dividing by zero raises ZeroDivisionError. The matching except catches it." },
      { icon: "🔄", color: "#f59e0b", title: "finally always runs — second call too", code: `# After the except:\nprint("Done.")  # finally always runs!`, explain: "finally runs after every call, error or not. Two calls = two 'Done.' prints." }
    ]
  },

  "7-3": {
    type: "fill",
    title: "⚔️ Battle: Modules & Packages",
    xpReward: 15,
    problem: "Complete the import statements to make this code work:",
    code:
`___ math
___ random ___ choice, randint
___ datetime ___ datetime

print(math.___(25))        # 5.0
print(randint(1, 10))      # random 1-10
print(choice(["a","b","c"]))  # random item
print(datetime.now().year)`,
    blanks: [
      { placeholder: "___ math", answer: "import", validAnswers: ["import"] },
      { placeholder: "___ random ___ choice", answer: "from, import", validAnswers: ["from", "from random"] },
      { placeholder: "random ___ choice", answer: "import", validAnswers: ["import"] },
      { placeholder: "___ datetime ___ datetime", answer: "from, import", validAnswers: ["from", "from datetime"] },
      { placeholder: "datetime ___ datetime", answer: "import", validAnswers: ["import"] },
      { placeholder: "math.___", answer: "sqrt", validAnswers: ["sqrt", "sqrt(25)"] }
    ],
    hint: "'import module' imports the whole module. 'from module import func' imports just that function.",
    steps: [
      { icon: "📦", color: "#dc2626", title: "'import math' — full module", code: `import math\nmath.sqrt(25)  # Must use math. prefix`, explain: "'import math' gives access to all math functions via math.function_name()" },
      { icon: "🎯", color: "#f59e0b", title: "'from random import ...' — specific functions", code: `from random import choice, randint\nrandint(1, 10)  # No 'random.' prefix needed!`, explain: "'from X import Y' imports Y directly — no module prefix needed when calling." },
      { icon: "✅", color: "#22c55e", title: "math.sqrt(25) = 5.0", code: `import math\nprint(math.sqrt(25))  # 5.0\n# sqrt returns a float`, explain: "sqrt always returns a float. sqrt(25) = 5.0, not 5." }
    ]
  },

  "7-4": {
    type: "output",
    title: "⚔️ Battle: Decorators & Generators",
    xpReward: 15,
    problem: "What does this generator and decorator code print?",
    code:
`def shout(func):
    def wrapper(*args):
        result = func(*args)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(greet("aria"))
for num in countdown(3):
    print(num)`,
    answer: "HELLO, ARIA\n3\n2\n1",
    validAnswers: ["HELLO, ARIA\n3\n2\n1", "HELLO, ARIA\r\n3\r\n2\r\n1"],
    hint: "The decorator wraps greet — calling .upper() on its return value. yield produces values one-at-a-time.",
    steps: [
      { icon: "🎀", color: "#dc2626", title: "@shout wraps greet with uppercase", code: `@shout\ndef greet(name):\n    return f"hello, {name}"\n# greet("aria") → wrapper("aria")\n# → "hello, aria".upper() → "HELLO, ARIA"`, explain: "@shout replaces greet with wrapper. wrapper calls original greet then .upper() on result." },
      { icon: "⚙️", color: "#a855f7", title: "Generator: yield produces values lazily", code: `def countdown(n):\n    while n > 0:\n        yield n   # pause & give value\n        n -= 1`, explain: "yield pauses the function and returns n. Next iteration resumes from after yield." },
      { icon: "🔄", color: "#00d4ff", title: "countdown(3) → 3, 2, 1", code: `for num in countdown(3):\n    print(num)\n# 3  (yield 3, n becomes 2)\n# 2  (yield 2, n becomes 1)\n# 1  (yield 1, n becomes 0 → stop)`, explain: "The for loop gets each yielded value. n > 0 fails when n=0, generator stops." }
    ]
  }
};
