// ============================================================
// PyQuest — Content Data (Lessons, Quizzes, Boss Battles)
// ============================================================

const WORLDS = [
  // ─────────────────────────────────────────────────────────
  // WORLD 1: The Awakening
  // ─────────────────────────────────────────────────────────
  {
    id: 1,
    title: "The Awakening",
    subtitle: "Variables & Data Types",
    icon: "🌍",
    color: "#00d4ff",
    bgGradient: "linear-gradient(135deg, #0a1628 0%, #0d2137 100%)",
    xpReward: 200,
    lessons: [
      {
        id: "1-1",
        title: "Variables & Assignment",
        icon: "📦",
        xp: 25,
        content: `
          <h2>What is a Variable?</h2>
          <p>A variable is like a <strong>labeled box</strong> that stores data in your program. You create it by giving it a name and assigning a value using <code>=</code>.</p>
          <div class="code-block">
<pre><span class="kw">name</span> = <span class="str">"PyQuest Hero"</span>
<span class="kw">level</span> = <span class="num">1</span>
<span class="kw">hp</span> = <span class="num">100</span>
<span class="kw">is_alive</span> = <span class="bool">True</span>

<span class="fn">print</span>(name)    <span class="cmt"># Output: PyQuest Hero</span>
<span class="fn">print</span>(level)   <span class="cmt"># Output: 1</span></pre>
          </div>
          <h3>📌 Naming Rules</h3>
          <ul>
            <li>Must start with a letter or underscore <code>_</code></li>
            <li>Can contain letters, numbers, underscores</li>
            <li>Case-sensitive: <code>hero</code> ≠ <code>Hero</code></li>
            <li>Cannot use Python keywords like <code>if</code>, <code>for</code>, <code>while</code></li>
          </ul>
          <div class="tip-box">💡 <strong>Pro Tip:</strong> Use descriptive names! <code>player_score</code> is better than <code>ps</code>.</div>
        `,
        quiz: [
          { q: "Which is a valid variable name?", options: ["2name", "_my_var", "my-var", "for"], answer: 1 },
          { q: "What symbol assigns a value to a variable?", options: ["==", "=>", "=", ":="], answer: 2 },
          { q: "What prints when you run: x = 5; print(x)?", options: ["x", "5", "'5'", "Error"], answer: 1 }
        ]
      },
      {
        id: "1-2",
        title: "Data Types",
        icon: "🔤",
        xp: 25,
        content: `
          <h2>Python Data Types</h2>
          <p>Every value in Python has a <strong>type</strong>. The main built-in types are:</p>
          <div class="type-grid">
            <div class="type-card">
              <span class="type-icon">🔢</span>
              <strong>int</strong>
              <code>age = 25</code>
            </div>
            <div class="type-card">
              <span class="type-icon">🌊</span>
              <strong>float</strong>
              <code>pi = 3.14</code>
            </div>
            <div class="type-card">
              <span class="type-icon">📝</span>
              <strong>str</strong>
              <code>name = "Hero"</code>
            </div>
            <div class="type-card">
              <span class="type-icon">⚡</span>
              <strong>bool</strong>
              <code>alive = True</code>
            </div>
          </div>
          <div class="code-block">
<pre><span class="fn">type</span>(<span class="num">42</span>)        <span class="cmt"># &lt;class 'int'&gt;</span>
<span class="fn">type</span>(<span class="num">3.14</span>)      <span class="cmt"># &lt;class 'float'&gt;</span>
<span class="fn">type</span>(<span class="str">"hello"</span>)   <span class="cmt"># &lt;class 'str'&gt;</span>
<span class="fn">type</span>(<span class="bool">True</span>)      <span class="cmt"># &lt;class 'bool'&gt;</span></pre>
          </div>
          <div class="tip-box">💡 Use <code>type()</code> to check what type a value is!</div>
        `,
        quiz: [
          { q: "What is the type of: x = 3.14?", options: ["int", "float", "str", "bool"], answer: 1 },
          { q: "Which is a boolean value?", options: ["'True'", "1.0", "True", "true"], answer: 2 },
          { q: "What does type(42) return?", options: ["float", "number", "int", "'42'"], answer: 2 }
        ]
      },
      {
        id: "1-3",
        title: "Strings & String Methods",
        icon: "🔡",
        xp: 30,
        content: `
          <h2>Strings in Python</h2>
          <p>A string is a sequence of characters enclosed in quotes. You can use single <code>'</code> or double <code>"</code> quotes.</p>
          <div class="code-block">
<pre><span class="kw">hero</span> = <span class="str">"PyQuest Warrior"</span>
<span class="fn">print</span>(hero.<span class="method">upper</span>())      <span class="cmt"># PYQUEST WARRIOR</span>
<span class="fn">print</span>(hero.<span class="method">lower</span>())      <span class="cmt"># pyquest warrior</span>
<span class="fn">print</span>(hero.<span class="method">len</span>())        <span class="cmt"># hmm... use len(hero) instead!</span>
<span class="fn">print</span>(<span class="fn">len</span>(hero))         <span class="cmt"># 15</span>
<span class="fn">print</span>(hero.<span class="method">replace</span>(<span class="str">"Warrior"</span>, <span class="str">"Mage"</span>))  <span class="cmt"># PyQuest Mage</span>
<span class="fn">print</span>(hero[<span class="num">0</span>])           <span class="cmt"># P (indexing)</span>
<span class="fn">print</span>(hero[<span class="num">0</span>:<span class="num">7</span>])         <span class="cmt"># PyQuest (slicing)</span></pre>
          </div>
          <h3>f-Strings (Formatted Strings)</h3>
          <div class="code-block">
<pre><span class="kw">name</span> = <span class="str">"Hero"</span>
<span class="kw">xp</span> = <span class="num">500</span>
<span class="fn">print</span>(<span class="str">f"Player: {name}, XP: {xp}"</span>)
<span class="cmt"># Output: Player: Hero, XP: 500</span></pre>
          </div>
        `,
        quiz: [
          { q: "What does 'hello'.upper() return?", options: ["hello", "Hello", "HELLO", "Error"], answer: 2 },
          { q: "What does len('Python') return?", options: ["5", "6", "7", "Error"], answer: 1 },
          { q: "What is the output: name='Hero'; print(name[0])?", options: ["H", "e", "Hero", "0"], answer: 0 }
        ]
      },
      {
        id: "1-4",
        title: "User Input & Type Casting",
        icon: "⌨️",
        xp: 30,
        content: `
          <h2>Getting Input from Users</h2>
          <p>The <code>input()</code> function pauses the program and waits for the user to type something. It <strong>always returns a string</strong>.</p>
          <div class="code-block">
<pre><span class="kw">name</span> = <span class="fn">input</span>(<span class="str">"Enter your name: "</span>)
<span class="fn">print</span>(<span class="str">f"Welcome, {name}!"</span>)</pre>
          </div>
          <h3>Type Casting</h3>
          <p>Converting between types is called <strong>casting</strong>.</p>
          <div class="code-block">
<pre><span class="kw">age_str</span> = <span class="fn">input</span>(<span class="str">"Enter your age: "</span>)  <span class="cmt"># returns "25" (string)</span>
<span class="kw">age</span> = <span class="fn">int</span>(age_str)                  <span class="cmt"># convert to integer: 25</span>
<span class="kw">score</span> = <span class="fn">float</span>(<span class="str">"99.5"</span>)              <span class="cmt"># convert to float: 99.5</span>
<span class="kw">text</span> = <span class="fn">str</span>(<span class="num">42</span>)                      <span class="cmt"># convert to string: "42"</span></pre>
          </div>
          <div class="warning-box">⚠️ <strong>Warning:</strong> If you try <code>int("hello")</code>, Python will raise a <code>ValueError</code>!</div>
        `,
        quiz: [
          { q: "What does input() always return?", options: ["int", "float", "str", "bool"], answer: 2 },
          { q: "What is int('42') + 1?", options: ["421", "43", "Error", "'43'"], answer: 1 },
          { q: "What happens with int('hello')?", options: ["Returns 0", "Returns None", "ValueError", "Returns 'hello'"], answer: 2 }
        ]
      }
    ],
    boss: {
      name: "The Tyrant of Types",
      title: "World 1 Boss",
      icon: "👹",
      hp: 100,
      description: "The Tyrant of Types has corrupted all data in the kingdom! Prove you understand variables and data types to defeat him!",
      xpReward: 200,
      questions: [
        { q: "What is the output of: x = '5'; y = 3; print(x * y)?", options: ["15", "555", "Error", "'53'"], answer: 1 },
        { q: "Which converts the string '3.14' to a float?", options: ["int('3.14')", "float('3.14')", "str(3.14)", "bool('3.14')"], answer: 1 },
        { q: "What does: name = 'Python'; print(name[-1]) output?", options: ["P", "n", "Error", "0"], answer: 1 },
        { q: "x = True; y = False; print(type(x)) outputs?", options: ["bool", "<class 'bool'>", "True", "int"], answer: 1 },
        { q: "Which method checks if a string starts with a letter?", options: [".upper()", ".startswith()", ".find()", ".index()"], answer: 1 },
        { q: "What is the output of: print(len('Hello World'))?", options: ["10", "11", "12", "Error"], answer: 1 },
        { q: "f-strings are defined with which prefix?", options: ["s", "f", "r", "b"], answer: 1 },
        { q: "What is type(3 / 2)?", options: ["int", "float", "str", "bool"], answer: 1 }
      ],
      practicalProblem: {
        description: "A hero's inventory system is broken. Look at the code and determine what it outputs.",
        codeSnippet: `name = "Aria"
level = 5
hp = 100.0
is_alive = True

info = f"{name} | Lv.{level} | HP:{int(hp)} | Alive:{is_alive}"
print(info)
print(type(level))`,
        options: [
          "Aria | Lv.5 | HP:100 | Alive:True  then  <class 'int'>",
          "Aria | Lv.5 | HP:100.0 | Alive:True  then  <class 'float'>",
          "Aria | Lv.5 | HP:100 | Alive:true  then  <class 'int'>",
          "Error — cannot mix types in f-string"
        ],
        answer: 0,
        solution: {
          steps: [
            { title: "Assign variables", explanation: "name='Aria' (str), level=5 (int), hp=100.0 (float), is_alive=True (bool).", code: `name = "Aria"\nlevel = 5\nhp = 100.0\nis_alive = True` },
            { title: "Build the f-string", explanation: "int(hp) converts 100.0 → 100. is_alive stays True (capital T in Python).", code: `info = f"{name} | Lv.{level} | HP:{int(hp)} | Alive:{is_alive}"` },
            { title: "Print info", explanation: "This prints: Aria | Lv.5 | HP:100 | Alive:True", code: `print(info)  # Aria | Lv.5 | HP:100 | Alive:True` },
            { title: "Print type(level)", explanation: "level is an int, so type(level) is <class 'int'>.", code: `print(type(level))  # <class 'int'>` }
          ],
          finalCode: `name = "Aria"\nlevel = 5\nhp = 100.0\nis_alive = True\ninfo = f"{name} | Lv.{level} | HP:{int(hp)} | Alive:{is_alive}"\nprint(info)        # Aria | Lv.5 | HP:100 | Alive:True\nprint(type(level)) # <class 'int'>`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 2: The Decision Dungeon
  // ─────────────────────────────────────────────────────────
  {
    id: 2,
    title: "The Decision Dungeon",
    subtitle: "Control Flow & Conditions",
    icon: "🌋",
    color: "#ff6b35",
    bgGradient: "linear-gradient(135deg, #1a0a00 0%, #2d1000 100%)",
    xpReward: 250,
    lessons: [
      {
        id: "2-1",
        title: "if / elif / else",
        icon: "🔀",
        xp: 30,
        content: `
          <h2>Making Decisions in Python</h2>
          <p>The <code>if</code> statement lets your program make decisions. It runs a block of code only if a condition is <strong>True</strong>.</p>
          <div class="code-block">
<pre><span class="kw">hp</span> = <span class="num">75</span>

<span class="cf">if</span> hp > <span class="num">50</span>:
    <span class="fn">print</span>(<span class="str">"Hero is healthy!"</span>)
<span class="cf">elif</span> hp > <span class="num">25</span>:
    <span class="fn">print</span>(<span class="str">"Hero is wounded!"</span>)
<span class="cf">else</span>:
    <span class="fn">print</span>(<span class="str">"Hero is near death!"</span>)

<span class="cmt"># Output: Hero is healthy!</span></pre>
          </div>
          <h3>Important Rules</h3>
          <ul>
            <li>Code inside <code>if</code> must be indented (4 spaces or 1 tab)</li>
            <li><code>elif</code> = "else if" — checks another condition</li>
            <li><code>else</code> runs if no conditions are true</li>
          </ul>
          <div class="tip-box">💡 Indentation is Python's way of grouping code — it's <strong>not optional!</strong></div>
        `,
        quiz: [
          { q: "What runs if the 'if' condition is False and there's no elif/else?", options: ["Error", "Nothing", "The if block runs anyway", "Python crashes"], answer: 1 },
          { q: "How do you write 'else if' in Python?", options: ["elseif", "elsif", "elif", "else if"], answer: 2 },
          { q: "x=10; if x > 5: print('yes') — what prints?", options: ["yes", "nothing", "True", "Error"], answer: 0 }
        ]
      },
      {
        id: "2-2",
        title: "Comparison & Logical Operators",
        icon: "⚖️",
        xp: 30,
        content: `
          <h2>Operators for Conditions</h2>
          <table class="info-table">
            <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
            <tr><td><code>==</code></td><td>Equal to</td><td><code>x == 5</code></td></tr>
            <tr><td><code>!=</code></td><td>Not equal</td><td><code>x != 5</code></td></tr>
            <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>x &gt; 5</code></td></tr>
            <tr><td><code>&lt;</code></td><td>Less than</td><td><code>x &lt; 5</code></td></tr>
            <tr><td><code>&gt;=</code></td><td>Greater or equal</td><td><code>x &gt;= 5</code></td></tr>
            <tr><td><code>and</code></td><td>Both must be true</td><td><code>x &gt; 1 and x &lt; 10</code></td></tr>
            <tr><td><code>or</code></td><td>At least one true</td><td><code>x &lt; 1 or x &gt; 10</code></td></tr>
            <tr><td><code>not</code></td><td>Reverses boolean</td><td><code>not True → False</code></td></tr>
          </table>
          <div class="code-block">
<pre><span class="kw">level</span> = <span class="num">5</span>
<span class="kw">has_key</span> = <span class="bool">True</span>

<span class="cf">if</span> level >= <span class="num">5</span> <span class="kw">and</span> has_key:
    <span class="fn">print</span>(<span class="str">"Door unlocked!"</span>)  <span class="cmt"># This runs!</span></pre>
          </div>
        `,
        quiz: [
          { q: "What does 'not True' evaluate to?", options: ["True", "False", "None", "Error"], answer: 1 },
          { q: "5 == '5' in Python evaluates to?", options: ["True", "False", "Error", "None"], answer: 1 },
          { q: "True and False evaluates to?", options: ["True", "False", "None", "Error"], answer: 1 }
        ]
      },
      {
        id: "2-3",
        title: "Nested Conditions",
        icon: "🪆",
        xp: 35,
        content: `
          <h2>Nesting if Statements</h2>
          <p>You can put <code>if</code> statements inside other <code>if</code> statements. This is called <strong>nesting</strong>.</p>
          <div class="code-block">
<pre><span class="kw">player_class</span> = <span class="str">"warrior"</span>
<span class="kw">has_sword</span> = <span class="bool">True</span>

<span class="cf">if</span> player_class == <span class="str">"warrior"</span>:
    <span class="cf">if</span> has_sword:
        <span class="fn">print</span>(<span class="str">"Warrior with sword! +50 ATK"</span>)
    <span class="cf">else</span>:
        <span class="fn">print</span>(<span class="str">"Warrior without weapon. +10 ATK"</span>)
<span class="cf">else</span>:
    <span class="fn">print</span>(<span class="str">"Unknown class!"</span>)

<span class="cmt"># Output: Warrior with sword! +50 ATK</span></pre>
          </div>
          <h3>One-Line Ternary</h3>
          <div class="code-block">
<pre><span class="kw">status</span> = <span class="str">"alive"</span> <span class="cf">if</span> hp > <span class="num">0</span> <span class="cf">else</span> <span class="str">"dead"</span></pre>
          </div>
        `,
        quiz: [
          { q: "What is the ternary/one-line syntax in Python?", options: ["x if cond else y", "cond ? x : y", "if cond then x else y", "x when cond or y"], answer: 0 },
          { q: "Nested if statements require how many levels of indentation?", options: ["Same as outer", "One more level each", "No indentation", "Two tab spaces"], answer: 1 },
          { q: "x=5; result = 'big' if x > 10 else 'small'; print(result)?", options: ["big", "small", "True", "Error"], answer: 1 }
        ]
      }
    ],
    boss: {
      name: "Lord Conditionalus",
      title: "World 2 Boss",
      icon: "🧙",
      hp: 100,
      description: "Lord Conditionalus controls the flow of all decisions! He can only be defeated by someone who truly understands conditions and logic.",
      xpReward: 250,
      questions: [
        { q: "x=7; if x > 5 and x < 10: print('yes') — output?", options: ["yes", "nothing", "Error", "True"], answer: 0 },
        { q: "What operator checks equality in Python?", options: ["=", "==", "===", "!="], answer: 1 },
        { q: "not (True and False) evaluates to?", options: ["True", "False", "None", "Error"], answer: 0 },
        { q: "What keyword is 'else if' in Python?", options: ["elseif", "elsif", "elif", "or"], answer: 2 },
        { q: "x=3; y = 'odd' if x % 2 != 0 else 'even' — y is?", options: ["odd", "even", "3", "Error"], answer: 0 },
        { q: "Which is correct Python indentation?", options: ["if x: print('yes')", "if x:\\n    print('yes')", "if(x):{print('yes')}", "if x then print"], answer: 1 },
        { q: "True or False evaluates to?", options: ["True", "False", "None", "Error"], answer: 0 },
        { q: "5 != 5 evaluates to?", options: ["True", "False", "None", "Error"], answer: 1 }
      ],
      practicalProblem: {
        description: "Trace through this dungeon gate logic and find the correct output.",
        codeSnippet: `level = 8
has_key = False
is_vip = True

if level >= 10 or is_vip:
    if has_key:
        print("Enter the vault")
    else:
        print("VIP lounge access")
else:
    print("Access denied")`,
        options: [
          "Enter the vault",
          "VIP lounge access",
          "Access denied",
          "Error — invalid condition"
        ],
        answer: 1,
        solution: {
          steps: [
            { title: "Check outer condition", explanation: "level >= 10 is False (8 < 10), but is_vip is True. True or False = True, so we enter the outer if.", code: `if level >= 10 or is_vip:  # False or True → True ✅` },
            { title: "Check inner condition", explanation: "has_key is False, so the inner if fails.", code: `if has_key:  # False → goes to else` },
            { title: "Execute else branch", explanation: "The else branch runs and prints 'VIP lounge access'.", code: `print("VIP lounge access")` }
          ],
          finalCode: `level = 8\nhas_key = False\nis_vip = True\n# level>=10 → False, is_vip → True → enters outer if\n# has_key → False → goes to else\nprint("VIP lounge access")  # ✅`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 3: The Loop Labyrinth
  // ─────────────────────────────────────────────────────────
  {
    id: 3,
    title: "The Loop Labyrinth",
    subtitle: "Loops & Iteration",
    icon: "🌀",
    color: "#a855f7",
    bgGradient: "linear-gradient(135deg, #0f0020 0%, #1a0035 100%)",
    xpReward: 300,
    lessons: [
      {
        id: "3-1",
        title: "while Loops",
        icon: "🔁",
        xp: 30,
        content: `
          <h2>The while Loop</h2>
          <p>A <code>while</code> loop repeats code <strong>as long as a condition is True</strong>. When the condition becomes False, it stops.</p>
          <div class="code-block">
<pre><span class="kw">hp</span> = <span class="num">100</span>
<span class="kw">damage</span> = <span class="num">25</span>

<span class="cf">while</span> hp > <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">f"HP: {hp}"</span>)
    hp -= damage

<span class="fn">print</span>(<span class="str">"Hero has fallen!"</span>)
<span class="cmt"># HP: 100 → HP: 75 → HP: 50 → HP: 25 → Hero has fallen!</span></pre>
          </div>
          <div class="warning-box">⚠️ <strong>Infinite Loop Alert!</strong> If the condition never becomes False, your program runs forever. Always make sure the loop can end!</div>
        `,
        quiz: [
          { q: "A while loop runs when its condition is?", options: ["False", "None", "True", "0"], answer: 2 },
          { q: "What causes an infinite loop?", options: ["A condition that's always True", "Using while", "Too many iterations", "Large numbers"], answer: 0 },
          { q: "x=1; while x < 3: x += 1 — how many times does it loop?", options: ["1", "2", "3", "Infinite"], answer: 1 }
        ]
      },
      {
        id: "3-2",
        title: "for Loops",
        icon: "➡️",
        xp: 30,
        content: `
          <h2>The for Loop</h2>
          <p>A <code>for</code> loop iterates over a <strong>sequence</strong> (list, string, range, etc.).</p>
          <div class="code-block">
<pre><span class="cmt"># Loop through a range</span>
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    <span class="fn">print</span>(<span class="str">f"Round {i+1}"</span>)
<span class="cmt"># Round 1, Round 2, ..., Round 5</span>

<span class="cmt"># Loop through a list</span>
<span class="kw">heroes</span> = [<span class="str">"Arthur"</span>, <span class="str">"Lancelot"</span>, <span class="str">"Merlin"</span>]
<span class="cf">for</span> hero <span class="kw">in</span> heroes:
    <span class="fn">print</span>(<span class="str">f"Hero: {hero}"</span>)

<span class="cmt"># Loop through a string</span>
<span class="cf">for</span> char <span class="kw">in</span> <span class="str">"Python"</span>:
    <span class="fn">print</span>(char)</pre>
          </div>
          <h3>range() function</h3>
          <div class="code-block">
<pre><span class="fn">range</span>(<span class="num">5</span>)        <span class="cmt"># 0, 1, 2, 3, 4</span>
<span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>)     <span class="cmt"># 1, 2, 3, 4, 5</span>
<span class="fn">range</span>(<span class="num">0</span>, <span class="num">10</span>, <span class="num">2</span>) <span class="cmt"># 0, 2, 4, 6, 8</span></pre>
          </div>
        `,
        quiz: [
          { q: "What does range(3) produce?", options: ["1,2,3", "0,1,2", "0,1,2,3", "1,2,3,4"], answer: 1 },
          { q: "for x in 'hi': print(x) prints how many lines?", options: ["1", "2", "3", "Error"], answer: 1 },
          { q: "range(1, 10, 3) produces?", options: ["1,4,7,10", "1,4,7", "0,3,6,9", "1,3,6,9"], answer: 1 }
        ]
      },
      {
        id: "3-3",
        title: "break, continue & pass",
        icon: "⏩",
        xp: 35,
        content: `
          <h2>Loop Control Statements</h2>
          <div class="code-block">
<pre><span class="cmt"># break — exits the loop immediately</span>
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>):
    <span class="cf">if</span> i == <span class="num">5</span>:
        <span class="cf">break</span>
    <span class="fn">print</span>(i)  <span class="cmt"># Prints 0 to 4 only</span>

<span class="cmt"># continue — skips the rest of this iteration</span>
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    <span class="cf">if</span> i == <span class="num">2</span>:
        <span class="cf">continue</span>
    <span class="fn">print</span>(i)  <span class="cmt"># Prints 0, 1, 3, 4 (skips 2)</span>

<span class="cmt"># pass — does nothing, placeholder</span>
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
    <span class="cf">pass</span>  <span class="cmt"># Loop runs but does nothing</span></pre>
          </div>
          <div class="tip-box">💡 <code>pass</code> is useful when writing code structure before filling in the logic.</div>
        `,
        quiz: [
          { q: "What does 'break' do in a loop?", options: ["Skips one iteration", "Exits the loop", "Restarts the loop", "Causes an error"], answer: 1 },
          { q: "What does 'continue' do?", options: ["Exits the loop", "Skips current iteration", "Does nothing", "Breaks the loop"], answer: 1 },
          { q: "for i in range(5): if i==3: break; print(i) — last number printed?", options: ["3", "2", "4", "5"], answer: 1 }
        ]
      },
      {
        id: "3-4",
        title: "Nested Loops",
        icon: "🔄",
        xp: 35,
        content: `
          <h2>Loops Inside Loops</h2>
          <p>A nested loop is a loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.</p>
          <div class="code-block">
<pre><span class="cmt"># Multiplication table</span>
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">4</span>):
    <span class="cf">for</span> j <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">4</span>):
        <span class="fn">print</span>(<span class="str">f"{i} x {j} = {i*j}"</span>)

<span class="cmt"># Dungeon grid example</span>
<span class="cf">for</span> row <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
    <span class="cf">for</span> col <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
        <span class="fn">print</span>(<span class="str">f"({row},{col})"</span>, end=<span class="str">" "</span>)
    <span class="fn">print</span>()  <span class="cmt"># new row</span></pre>
          </div>
        `,
        quiz: [
          { q: "How many total iterations: for i in range(3): for j in range(3)?", options: ["3", "6", "9", "12"], answer: 2 },
          { q: "In nested loops, which loop completes first per outer iteration?", options: ["Outer", "Inner", "Both at same time", "Random"], answer: 1 },
          { q: "What does end='' do in print()?", options: ["Adds newline", "Prevents newline", "Nothing", "Adds a tab"], answer: 1 }
        ]
      }
    ],
    boss: {
      name: "The Infinite Serpent",
      title: "World 3 Boss",
      icon: "🐍",
      hp: 100,
      description: "The Infinite Serpent loops endlessly, consuming all who enter the labyrinth. Only a master of loops can find the break to escape its coils!",
      xpReward: 300,
      questions: [
        { q: "x=0; while x < 3: x += 1 — how many times does the loop run?", options: ["2", "3", "4", "Infinite"], answer: 1 },
        { q: "What does range(2, 8, 2) produce?", options: ["2,4,6,8", "2,4,6", "0,2,4,6,8", "2,3,4,5,6,7"], answer: 1 },
        { q: "for i in range(5): if i==3: break — what is i when loop exits?", options: ["3", "4", "2", "5"], answer: 0 },
        { q: "continue skips to the?", options: ["End of loop", "Next iteration", "Previous iteration", "Start of loop"], answer: 1 },
        { q: "How many lines does: for i in range(3): for j in range(2): print(i,j) print?", options: ["3", "2", "5", "6"], answer: 3 },
        { q: "What does pass do inside a loop?", options: ["Breaks it", "Skips an item", "Does nothing", "Continues to next"], answer: 2 },
        { q: "range(10, 0, -2) starts at?", options: ["0", "2", "10", "-2"], answer: 2 },
        { q: "A for loop iterates over a __?", options: ["Condition", "Sequence", "Function", "Boolean"], answer: 1 }
      ],
      practicalProblem: {
        description: "What does this nested loop print? Count the total output lines.",
        codeSnippet: `total = 0
for i in range(1, 4):
    for j in range(1, i + 1):
        total += j
print(total)`,
        options: ["6", "10", "12", "9"],
        answer: 1,
        solution: {
          steps: [
            { title: "i=1 iteration", explanation: "Inner loop runs once (j=1). total += 1 → total = 1", code: `# i=1: j goes 1..1\ntotal += 1  # total = 1` },
            { title: "i=2 iteration", explanation: "Inner loop runs twice (j=1,2). total += 1+2 = 3 → total = 4", code: `# i=2: j goes 1..2\ntotal += 1 + 2  # total = 4` },
            { title: "i=3 iteration", explanation: "Inner loop runs three times (j=1,2,3). total += 1+2+3 = 6 → total = 10", code: `# i=3: j goes 1..3\ntotal += 1 + 2 + 3  # total = 10` },
            { title: "Final print", explanation: "print(total) outputs 10.", code: `print(total)  # 10` }
          ],
          finalCode: `total = 0\nfor i in range(1, 4):\n    for j in range(1, i + 1):\n        total += j\nprint(total)  # 10`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 4: The Function Fortress
  // ─────────────────────────────────────────────────────────
  {
    id: 4,
    title: "The Function Fortress",
    subtitle: "Functions & Scope",
    icon: "🏰",
    color: "#22c55e",
    bgGradient: "linear-gradient(135deg, #001a08 0%, #002d10 100%)",
    xpReward: 350,
    lessons: [
      {
        id: "4-1",
        title: "Defining & Calling Functions",
        icon: "🧩",
        xp: 35,
        content: `
          <h2>What is a Function?</h2>
          <p>A function is a <strong>reusable block of code</strong> with a name. You <em>define</em> it once and <em>call</em> it whenever you need it.</p>
          <div class="code-block">
<pre><span class="cmt"># Defining a function</span>
<span class="cf">def</span> <span class="fn">greet</span>():
    <span class="fn">print</span>(<span class="str">"Welcome to PyQuest!"</span>)

<span class="cmt"># Calling the function</span>
<span class="fn">greet</span>()  <span class="cmt"># Output: Welcome to PyQuest!</span>
<span class="fn">greet</span>()  <span class="cmt"># Can call multiple times!</span></pre>
          </div>
          <h3>Why use functions?</h3>
          <ul>
            <li>♻️ Reuse code without repeating it</li>
            <li>📦 Organize code into logical pieces</li>
            <li>🐛 Easier to debug — fix once, fixed everywhere</li>
          </ul>
        `,
        quiz: [
          { q: "What keyword defines a function in Python?", options: ["function", "def", "func", "define"], answer: 1 },
          { q: "To run a function named 'attack', you write?", options: ["run attack", "attack()", "call attack", "def attack"], answer: 1 },
          { q: "Can you call a function multiple times?", options: ["No", "Yes, once", "Yes, unlimited", "Only twice"], answer: 2 }
        ]
      },
      {
        id: "4-2",
        title: "Parameters & Return Values",
        icon: "🎯",
        xp: 40,
        content: `
          <h2>Parameters & Arguments</h2>
          <p><strong>Parameters</strong> are the inputs a function accepts. <strong>Return</strong> sends a value back to the caller.</p>
          <div class="code-block">
<pre><span class="cf">def</span> <span class="fn">calculate_damage</span>(base_atk, multiplier):
    total = base_atk * multiplier
    <span class="cf">return</span> total

<span class="cmt"># Calling with arguments</span>
<span class="kw">dmg</span> = <span class="fn">calculate_damage</span>(<span class="num">50</span>, <span class="num">2</span>)
<span class="fn">print</span>(<span class="str">f"Damage: {dmg}"</span>)  <span class="cmt"># Damage: 100</span></pre>
          </div>
          <div class="code-block">
<pre><span class="cmt"># Multiple returns</span>
<span class="cf">def</span> <span class="fn">get_stats</span>(name):
    <span class="cf">return</span> name, <span class="num">100</span>, <span class="num">50</span>  <span class="cmt"># returns a tuple</span>

<span class="kw">name</span>, <span class="kw">hp</span>, <span class="kw">mp</span> = <span class="fn">get_stats</span>(<span class="str">"Hero"</span>)
<span class="fn">print</span>(name, hp, mp)  <span class="cmt"># Hero 100 50</span></pre>
          </div>
        `,
        quiz: [
          { q: "What keyword sends a value back from a function?", options: ["send", "return", "output", "give"], answer: 1 },
          { q: "A function with no return statement returns?", options: ["0", "False", "None", "Error"], answer: 2 },
          { q: "def add(a, b): return a + b; x = add(3, 4); print(x)?", options: ["34", "7", "Error", "None"], answer: 1 }
        ]
      },
      {
        id: "4-3",
        title: "Default & Keyword Arguments",
        icon: "⚙️",
        xp: 40,
        content: `
          <h2>Flexible Function Arguments</h2>
          <div class="code-block">
<pre><span class="cmt"># Default arguments</span>
<span class="cf">def</span> <span class="fn">create_hero</span>(name, class_=<span class="str">"Warrior"</span>, level=<span class="num">1</span>):
    <span class="fn">print</span>(<span class="str">f"{name} | {class_} | Lv.{level}"</span>)

<span class="fn">create_hero</span>(<span class="str">"Arthur"</span>)              <span class="cmt"># Arthur | Warrior | Lv.1</span>
<span class="fn">create_hero</span>(<span class="str">"Merlin"</span>, <span class="str">"Mage"</span>, <span class="num">5</span>) <span class="cmt"># Merlin | Mage | Lv.5</span>

<span class="cmt"># Keyword arguments (any order)</span>
<span class="fn">create_hero</span>(level=<span class="num">10</span>, name=<span class="str">"Lancelot"</span>)
<span class="cmt"># Lancelot | Warrior | Lv.10</span></pre>
          </div>
          <h3>*args and **kwargs</h3>
          <div class="code-block">
<pre><span class="cf">def</span> <span class="fn">total_damage</span>(*hits):    <span class="cmt"># accepts any number of args</span>
    <span class="cf">return</span> <span class="fn">sum</span>(hits)

<span class="fn">total_damage</span>(<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>)  <span class="cmt"># 60</span></pre>
          </div>
        `,
        quiz: [
          { q: "What does a default argument do?", options: ["Is required", "Has a fallback if not given", "Causes errors", "None of above"], answer: 1 },
          { q: "def f(a, b=5): return a+b; f(3) returns?", options: ["3", "5", "8", "Error"], answer: 2 },
          { q: "Keyword arguments allow you to specify args in?", options: ["Order only", "Any order", "Reverse order", "No order"], answer: 1 }
        ]
      },
      {
        id: "4-4",
        title: "Variable Scope",
        icon: "🔭",
        xp: 45,
        content: `
          <h2>Local vs Global Scope</h2>
          <p>Variables have <strong>scope</strong> — where they can be seen/used. Variables inside a function are <em>local</em>.</p>
          <div class="code-block">
<pre><span class="kw">world_name</span> = <span class="str">"PyQuest"</span>   <span class="cmt"># GLOBAL variable</span>

<span class="cf">def</span> <span class="fn">explore</span>():
    <span class="kw">level</span> = <span class="num">1</span>              <span class="cmt"># LOCAL variable</span>
    <span class="fn">print</span>(world_name)      <span class="cmt"># Can read global ✅</span>
    <span class="fn">print</span>(level)           <span class="cmt"># Can use local ✅</span>

<span class="fn">explore</span>()
<span class="fn">print</span>(world_name)          <span class="cmt"># Works ✅</span>
<span class="fn">print</span>(level)               <span class="cmt"># ❌ NameError! level is local</span></pre>
          </div>
          <div class="code-block">
<pre><span class="cmt"># Using global keyword to modify globals</span>
<span class="kw">score</span> = <span class="num">0</span>

<span class="cf">def</span> <span class="fn">add_points</span>(pts):
    <span class="cf">global</span> score
    score += pts

<span class="fn">add_points</span>(<span class="num">50</span>)
<span class="fn">print</span>(score)  <span class="cmt"># 50</span></pre>
          </div>
        `,
        quiz: [
          { q: "A variable defined inside a function is?", options: ["Global", "Local", "Public", "Static"], answer: 1 },
          { q: "What keyword lets a function modify a global variable?", options: ["global", "extern", "public", "static"], answer: 0 },
          { q: "Can you read a global var from inside a function (without declaring)?", options: ["No", "Yes", "Only with global", "Only strings"], answer: 1 }
        ]
      }
    ],
    boss: {
      name: "The Grand Architect",
      title: "World 4 Boss",
      icon: "🏛️",
      hp: 100,
      description: "The Grand Architect built the Function Fortress with pure logic. Prove you can design and call functions correctly to breach his fortress walls!",
      xpReward: 350,
      questions: [
        { q: "def greet(name='World'): print(f'Hello {name}'); greet() outputs?", options: ["Hello", "Hello World", "Hello name", "Error"], answer: 1 },
        { q: "A function that has no return statement returns?", options: ["0", "False", "None", "Empty string"], answer: 2 },
        { q: "What is *args used for?", options: ["Keyword arguments", "Variable positional args", "Default values", "Global vars"], answer: 1 },
        { q: "Local variables can be accessed?", options: ["Anywhere", "Only inside their function", "Only globally", "From other files"], answer: 1 },
        { q: "def f(a, b=2, c=3): return a+b+c; f(1) returns?", options: ["1", "3", "6", "Error"], answer: 2 },
        { q: "Which keyword modifies a global inside a function?", options: ["local", "global", "extern", "modify"], answer: 1 },
        { q: "def multiply(x, y): return x * y; multiply(3, 4) returns?", options: ["34", "7", "12", "None"], answer: 2 },
        { q: "Can a function return multiple values?", options: ["No", "Yes, as a tuple", "Only two", "Only with lists"], answer: 1 }
      ],
      practicalProblem: {
        description: "What does this function call print?",
        codeSnippet: `def power_up(hero, bonus=10, multiplier=2):
    base = bonus * multiplier
    return hero, base

name, dmg = power_up("Aria", multiplier=3)
print(f"{name} deals {dmg} damage!")`,
        options: [
          "Aria deals 20 damage!",
          "Aria deals 30 damage!",
          "Aria deals 10 damage!",
          "Error — wrong argument order"
        ],
        answer: 1,
        solution: {
          steps: [
            { title: "Call with keyword arg", explanation: "bonus uses default 10. multiplier=3 overrides default 2.", code: `power_up("Aria", multiplier=3)\n# hero="Aria", bonus=10 (default), multiplier=3` },
            { title: "Calculate base", explanation: "base = bonus * multiplier = 10 * 3 = 30", code: `base = 10 * 3  # 30` },
            { title: "Unpack return tuple", explanation: "Function returns ('Aria', 30). Unpacked into name and dmg.", code: `name, dmg = ("Aria", 30)` },
            { title: "Print result", explanation: "f-string formats to: Aria deals 30 damage!", code: `print(f"{name} deals {dmg} damage!")  # Aria deals 30 damage!` }
          ],
          finalCode: `def power_up(hero, bonus=10, multiplier=2):\n    base = bonus * multiplier\n    return hero, base\n\nname, dmg = power_up("Aria", multiplier=3)\nprint(f"{name} deals {dmg} damage!")  # Aria deals 30 damage!`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 5: The Data Structures Vault
  // ─────────────────────────────────────────────────────────
  {
    id: 5,
    title: "The Data Structures Vault",
    subtitle: "Lists, Dicts & More",
    icon: "📦",
    color: "#f59e0b",
    bgGradient: "linear-gradient(135deg, #1a1000 0%, #2d1f00 100%)",
    xpReward: 400,
    lessons: [
      {
        id: "5-1",
        title: "Lists",
        icon: "📋",
        xp: 40,
        content: `
          <h2>Python Lists</h2>
          <p>A list is an ordered, mutable collection. You can store multiple items of any type.</p>
          <div class="code-block">
<pre><span class="kw">inventory</span> = [<span class="str">"Sword"</span>, <span class="str">"Shield"</span>, <span class="str">"Potion"</span>]

<span class="cmt"># Accessing items</span>
<span class="fn">print</span>(inventory[<span class="num">0</span>])          <span class="cmt"># Sword</span>
<span class="fn">print</span>(inventory[-<span class="num">1</span>])         <span class="cmt"># Potion (last)</span>

<span class="cmt"># Modifying</span>
inventory.<span class="method">append</span>(<span class="str">"Bow"</span>)     <span class="cmt"># Add to end</span>
inventory.<span class="method">insert</span>(<span class="num">1</span>, <span class="str">"Map"</span>)  <span class="cmt"># Insert at index 1</span>
inventory.<span class="method">remove</span>(<span class="str">"Potion"</span>) <span class="cmt"># Remove by value</span>
inventory.<span class="method">pop</span>()             <span class="cmt"># Remove last item</span>

<span class="cmt"># Useful operations</span>
<span class="fn">len</span>(inventory)                <span class="cmt"># Length</span>
<span class="str">"Sword"</span> <span class="kw">in</span> inventory          <span class="cmt"># True/False membership test</span>
inventory.<span class="method">sort</span>()              <span class="cmt"># Sort alphabetically</span></pre>
          </div>
        `,
        quiz: [
          { q: "What does list.append(x) do?", options: ["Adds x to start", "Adds x to end", "Removes x", "Searches for x"], answer: 1 },
          { q: "x = [1,2,3]; x[-1] is?", options: ["1", "2", "3", "Error"], answer: 2 },
          { q: "How to check if 'apple' is in a list?", options: ["list.find('apple')", "'apple' in list", "list.has('apple')", "list.contains('apple')"], answer: 1 }
        ]
      },
      {
        id: "5-2",
        title: "Tuples & Sets",
        icon: "🔒",
        xp: 40,
        content: `
          <h2>Tuples — Immutable Lists</h2>
          <p>Tuples are like lists but <strong>cannot be changed</strong> after creation. Great for fixed data.</p>
          <div class="code-block">
<pre><span class="kw">position</span> = (<span class="num">10</span>, <span class="num">20</span>)      <span class="cmt"># x, y coordinates</span>
<span class="kw">rgb</span> = (<span class="num">255</span>, <span class="num">128</span>, <span class="num">0</span>)     <span class="cmt"># orange color</span>

<span class="fn">print</span>(position[<span class="num">0</span>])      <span class="cmt"># 10</span>
<span class="cmt"># position[0] = 5       # ❌ TypeError! Tuples are immutable</span></pre>
          </div>
          <h2>Sets — Unique Collections</h2>
          <p>Sets store <strong>unique values only</strong> — no duplicates. Great for membership tests.</p>
          <div class="code-block">
<pre><span class="kw">skills</span> = {<span class="str">"fire"</span>, <span class="str">"ice"</span>, <span class="str">"lightning"</span>}
skills.<span class="method">add</span>(<span class="str">"wind"</span>)     <span class="cmt"># Add item</span>
skills.<span class="method">add</span>(<span class="str">"fire"</span>)     <span class="cmt"># No duplicate! Set unchanged</span>
<span class="fn">print</span>(<span class="fn">len</span>(skills))     <span class="cmt"># 4, not 5</span>

<span class="cmt"># Remove duplicates from a list</span>
<span class="kw">scores</span> = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">3</span>]
<span class="kw">unique</span> = <span class="fn">list</span>(<span class="fn">set</span>(scores))  <span class="cmt"># [1, 2, 3]</span></pre>
          </div>
        `,
        quiz: [
          { q: "Tuples are defined with?", options: ["[]", "{}", "()", "<>"], answer: 2 },
          { q: "Can you modify a tuple after creation?", options: ["Yes", "No", "Only first element", "Yes with append"], answer: 1 },
          { q: "Sets can contain duplicate values?", options: ["Yes", "No", "Only numbers", "Only strings"], answer: 1 }
        ]
      },
      {
        id: "5-3",
        title: "Dictionaries",
        icon: "📚",
        xp: 45,
        content: `
          <h2>Python Dictionaries</h2>
          <p>A dictionary stores <strong>key-value pairs</strong>. Think of a spell book: the spell name is the key, the effect is the value.</p>
          <div class="code-block">
<pre><span class="kw">hero</span> = {
    <span class="str">"name"</span>: <span class="str">"Arthur"</span>,
    <span class="str">"class"</span>: <span class="str">"Warrior"</span>,
    <span class="str">"level"</span>: <span class="num">10</span>,
    <span class="str">"hp"</span>: <span class="num">250</span>
}

<span class="cmt"># Access values</span>
<span class="fn">print</span>(hero[<span class="str">"name"</span>])        <span class="cmt"># Arthur</span>
<span class="fn">print</span>(hero.<span class="method">get</span>(<span class="str">"mp"</span>, <span class="num">0</span>))   <span class="cmt"># 0 (default if missing)</span>

<span class="cmt"># Modify / add</span>
hero[<span class="str">"level"</span>] = <span class="num">11</span>          <span class="cmt"># Update existing</span>
hero[<span class="str">"xp"</span>] = <span class="num">1500</span>           <span class="cmt"># Add new key</span>

<span class="cmt"># Iterate</span>
<span class="cf">for</span> key, value <span class="kw">in</span> hero.<span class="method">items</span>():
    <span class="fn">print</span>(<span class="str">f"{key}: {value}"</span>)</pre>
          </div>
        `,
        quiz: [
          { q: "How do you access the value for key 'name' in a dict d?", options: ["d.name", "d('name')", "d['name']", "d->name"], answer: 2 },
          { q: "What does dict.get('key', default) do if key doesn't exist?", options: ["Raises error", "Returns None", "Returns default", "Returns empty string"], answer: 2 },
          { q: "Which method returns all key-value pairs?", options: [".keys()", ".values()", ".items()", ".pairs()"], answer: 2 }
        ]
      },
      {
        id: "5-4",
        title: "List Comprehensions",
        icon: "⚡",
        xp: 50,
        content: `
          <h2>List Comprehensions</h2>
          <p>A concise way to create lists. Much more Pythonic than a loop!</p>
          <div class="code-block">
<pre><span class="cmt"># Regular loop</span>
<span class="kw">squares</span> = []
<span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    squares.<span class="method">append</span>(i ** <span class="num">2</span>)

<span class="cmt"># List comprehension — same result!</span>
<span class="kw">squares</span> = [i ** <span class="num">2</span> <span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>)]
<span class="cmt"># [0, 1, 4, 9, 16]</span>

<span class="cmt"># With condition (filter)</span>
<span class="kw">evens</span> = [i <span class="cf">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>) <span class="cf">if</span> i % <span class="num">2</span> == <span class="num">0</span>]
<span class="cmt"># [0, 2, 4, 6, 8]</span>

<span class="cmt"># Transform strings</span>
<span class="kw">names</span> = [<span class="str">"arthur"</span>, <span class="str">"merlin"</span>, <span class="str">"lancelot"</span>]
<span class="kw">caps</span> = [n.<span class="method">upper</span>() <span class="cf">for</span> n <span class="kw">in</span> names]</pre>
          </div>
        `,
        quiz: [
          { q: "[x*2 for x in range(3)] evaluates to?", options: ["[0,2,4]", "[2,4,6]", "[1,2,3]", "[0,1,2]"], answer: 0 },
          { q: "List comprehensions are enclosed in?", options: ["{}", "()", "[]", "<>"], answer: 2 },
          { q: "[x for x in range(5) if x > 2] evaluates to?", options: ["[3,4]", "[2,3,4]", "[0,1,2]", "[3,4,5]"], answer: 0 }
        ]
      }
    ],
    boss: {
      name: "The Data Hydra",
      title: "World 5 Boss",
      icon: "🐲",
      hp: 100,
      description: "The Data Hydra has multiple heads — each one a different data structure! You must master lists, tuples, sets, and dicts to slay every head!",
      xpReward: 400,
      questions: [
        { q: "x = [1,2,3]; x.append(4); len(x)?", options: ["3", "4", "5", "Error"], answer: 1 },
        { q: "Which is immutable?", options: ["List", "Dict", "Set", "Tuple"], answer: 3 },
        { q: "d = {'a': 1}; d['b'] = 2; len(d)?", options: ["1", "2", "3", "Error"], answer: 1 },
        { q: "[x**2 for x in range(4)] produces?", options: ["[0,1,4,9]", "[1,4,9,16]", "[0,1,2,3]", "[1,2,3,4]"], answer: 0 },
        { q: "Sets automatically remove?", options: ["Strings", "Negatives", "Duplicates", "None values"], answer: 2 },
        { q: "d.get('missing', 'default') returns?", options: ["None", "Error", "'default'", "0"], answer: 2 },
        { q: "How to access the last element of list x?", options: ["x[last]", "x[-1]", "x[len-1]", "x.last()"], answer: 1 },
        { q: "[x for x in range(10) if x % 2 == 0] has how many elements?", options: ["4", "5", "6", "10"], answer: 1 }
      ],
      practicalProblem: {
        description: "What does this data manipulation code output?",
        codeSnippet: `heroes = [
    {"name": "Aria",  "xp": 850},
    {"name": "Bolt",  "xp": 420},
    {"name": "Zara",  "xp": 1200},
]

elite = [h["name"] for h in heroes if h["xp"] > 500]
print(elite)`,
        options: [
          "['Aria', 'Zara']",
          "['Aria', 'Bolt', 'Zara']",
          "['Bolt']",
          "['Zara']"
        ],
        answer: 0,
        solution: {
          steps: [
            { title: "Understand the list comprehension", explanation: "We filter heroes where xp > 500, then extract just the 'name' key.", code: `[h["name"] for h in heroes if h["xp"] > 500]` },
            { title: "Check each hero", explanation: "Aria: 850 > 500 ✅  Bolt: 420 > 500 ❌  Zara: 1200 > 500 ✅", code: `# Aria → included\n# Bolt → excluded\n# Zara → included` },
            { title: "Build result list", explanation: "Only Aria and Zara pass the filter.", code: `elite = ["Aria", "Zara"]` },
            { title: "Print", explanation: "Output: ['Aria', 'Zara']", code: `print(elite)  # ['Aria', 'Zara']` }
          ],
          finalCode: `heroes = [{"name":"Aria","xp":850},{"name":"Bolt","xp":420},{"name":"Zara","xp":1200}]\nelite = [h["name"] for h in heroes if h["xp"] > 500]\nprint(elite)  # ['Aria', 'Zara']`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 6: The OOP Citadel
  // ─────────────────────────────────────────────────────────
  {
    id: 6,
    title: "The OOP Citadel",
    subtitle: "Object-Oriented Programming",
    icon: "🌐",
    color: "#ec4899",
    bgGradient: "linear-gradient(135deg, #1a0010 0%, #2d001f 100%)",
    xpReward: 450,
    lessons: [
      {
        id: "6-1",
        title: "Classes & Objects",
        icon: "🏗️",
        xp: 50,
        content: `
          <h2>Classes & Objects</h2>
          <p>A <strong>class</strong> is a blueprint. An <strong>object</strong> is an instance of that blueprint.</p>
          <div class="code-block">
<pre><span class="cf">class</span> <span class="cls">Hero</span>:
    <span class="cf">def</span> <span class="fn">__init__</span>(self, name, hp, level):
        self.name = name      <span class="cmt"># instance attribute</span>
        self.hp = hp
        self.level = level

    <span class="cf">def</span> <span class="fn">attack</span>(self):
        <span class="fn">print</span>(<span class="str">f"{self.name} attacks for {self.level * 10} damage!"</span>)

    <span class="cf">def</span> <span class="fn">info</span>(self):
        <span class="fn">print</span>(<span class="str">f"{self.name} | HP: {self.hp} | Lv.{self.level}"</span>)

<span class="cmt"># Creating objects</span>
<span class="kw">arthur</span> = <span class="cls">Hero</span>(<span class="str">"Arthur"</span>, <span class="num">200</span>, <span class="num">10</span>)
<span class="kw">merlin</span> = <span class="cls">Hero</span>(<span class="str">"Merlin"</span>, <span class="num">120</span>, <span class="num">15</span>)

arthur.<span class="method">attack</span>()  <span class="cmt"># Arthur attacks for 100 damage!</span>
merlin.<span class="method">info</span>()    <span class="cmt"># Merlin | HP: 120 | Lv.15</span></pre>
          </div>
        `,
        quiz: [
          { q: "What is the special method called when an object is created?", options: ["__create__", "__init__", "__new__", "__start__"], answer: 1 },
          { q: "What does 'self' refer to in a method?", options: ["The class", "The current object", "A global variable", "The parent class"], answer: 1 },
          { q: "A class is a ____ and an object is an ____?", options: ["object, class", "blueprint, instance", "function, method", "type, value"], answer: 1 }
        ]
      },
      {
        id: "6-2",
        title: "Inheritance",
        icon: "🧬",
        xp: 55,
        content: `
          <h2>Inheritance</h2>
          <p>A child class can <strong>inherit</strong> all attributes and methods from a parent class, and add its own.</p>
          <div class="code-block">
<pre><span class="cf">class</span> <span class="cls">Character</span>:
    <span class="cf">def</span> <span class="fn">__init__</span>(self, name, hp):
        self.name = name
        self.hp = hp

    <span class="cf">def</span> <span class="fn">speak</span>(self):
        <span class="fn">print</span>(<span class="str">f"I am {self.name}"</span>)

<span class="cf">class</span> <span class="cls">Mage</span>(<span class="cls">Character</span>):         <span class="cmt"># inherits Character</span>
    <span class="cf">def</span> <span class="fn">__init__</span>(self, name, hp, mana):
        <span class="fn">super</span>().__init__(name, hp)  <span class="cmt"># call parent __init__</span>
        self.mana = mana

    <span class="cf">def</span> <span class="fn">cast_spell</span>(self):
        <span class="fn">print</span>(<span class="str">f"{self.name} casts Fireball! Mana: {self.mana}"</span>)

<span class="kw">merlin</span> = <span class="cls">Mage</span>(<span class="str">"Merlin"</span>, <span class="num">120</span>, <span class="num">300</span>)
merlin.<span class="method">speak</span>()        <span class="cmt"># Inherited from Character!</span>
merlin.<span class="method">cast_spell</span>()   <span class="cmt"># Mage-specific method</span></pre>
          </div>
        `,
        quiz: [
          { q: "How do you inherit from ParentClass in Python?", options: ["class Child: Parent", "class Child(Parent):", "class Child extends Parent:", "inherit Child from Parent:"], answer: 1 },
          { q: "What does super() refer to?", options: ["The child class", "The parent class", "Global scope", "A decorator"], answer: 1 },
          { q: "A child class can use all methods of its parent?", options: ["No", "Yes", "Only public methods", "Only with super()"], answer: 1 }
        ]
      },
      {
        id: "6-3",
        title: "Encapsulation & Polymorphism",
        icon: "🔐",
        xp: 60,
        content: `
          <h2>Encapsulation</h2>
          <p>Encapsulation <strong>hides internal data</strong> using private attributes (prefix with <code>__</code>).</p>
          <div class="code-block">
<pre><span class="cf">class</span> <span class="cls">Vault</span>:
    <span class="cf">def</span> <span class="fn">__init__</span>(self, gold):
        self.__gold = gold  <span class="cmt"># private!</span>

    <span class="cf">def</span> <span class="fn">get_gold</span>(self):
        <span class="cf">return</span> self.__gold

<span class="kw">v</span> = <span class="cls">Vault</span>(<span class="num">1000</span>)
<span class="fn">print</span>(v.<span class="method">get_gold</span>())   <span class="cmt"># 1000 ✅</span>
<span class="cmt"># print(v.__gold)     # AttributeError ❌</span></pre>
          </div>
          <h2>Polymorphism</h2>
          <p>Different objects can respond to the same method call in different ways.</p>
          <div class="code-block">
<pre><span class="cf">class</span> <span class="cls">Warrior</span>:
    <span class="cf">def</span> <span class="fn">attack</span>(self): <span class="fn">print</span>(<span class="str">"⚔️ Sword Slash!"</span>)

<span class="cf">class</span> <span class="cls">Archer</span>:
    <span class="cf">def</span> <span class="fn">attack</span>(self): <span class="fn">print</span>(<span class="str">"🏹 Arrow Shot!"</span>)

<span class="kw">party</span> = [<span class="cls">Warrior</span>(), <span class="cls">Archer</span>()]
<span class="cf">for</span> member <span class="kw">in</span> party:
    member.<span class="method">attack</span>()  <span class="cmt"># Each attacks differently!</span></pre>
          </div>
        `,
        quiz: [
          { q: "Private attributes in Python are prefixed with?", options: ["#", "__", "private_", "@"], answer: 1 },
          { q: "Polymorphism allows different classes to have the?", options: ["Same data", "Same method names with different behavior", "Same parent", "Same attributes"], answer: 1 },
          { q: "Encapsulation is about?", options: ["Speed", "Hiding internal data", "Inheritance", "Loops"], answer: 1 }
        ]
      }
    ],
    boss: {
      name: "The Shadow Architect",
      title: "World 6 Boss",
      icon: "🕷️",
      hp: 100,
      description: "The Shadow Architect built his citadel using the dark arts of OOP. Only someone who truly masters classes, objects, and inheritance can tear it down!",
      xpReward: 450,
      questions: [
        { q: "What is __init__ used for?", options: ["Deleting objects", "Initializing object attributes", "Inheriting classes", "Defining methods"], answer: 1 },
        { q: "class Dog(Animal): means Dog __ Animal?", options: ["contains", "inherits from", "equals", "overwrites"], answer: 1 },
        { q: "What does super().__init__() do?", options: ["Creates a child", "Calls the parent's __init__", "Deletes parent", "Imports a module"], answer: 1 },
        { q: "Private attributes are accessed with?", options: ["Direct access", "Getter methods", "global keyword", "super()"], answer: 1 },
        { q: "Polymorphism is when?", options: ["One class has many methods", "Multiple classes share same method name", "A class inherits all", "Methods return multiple values"], answer: 1 },
        { q: "self in a class method refers to?", options: ["The class itself", "The current instance", "The parent class", "A global variable"], answer: 1 },
        { q: "Can a child class override a parent method?", options: ["No", "Yes", "Only with super()", "Only private ones"], answer: 1 },
        { q: "Which symbol makes an attribute private?", options: ["_", "__", "#", "@"], answer: 1 }
      ],
      practicalProblem: {
        description: "What does this OOP code print?",
        codeSnippet: `class Spell:
    def __init__(self, name, power):
        self.name = name
        self.__power = power

    def cast(self):
        return f"{self.name}: {self.__power * 2} dmg"

class FireSpell(Spell):
    def cast(self):
        return f"FIRE! {self.name}: {self._Spell__power * 3} dmg"

s = FireSpell("Inferno", 50)
print(s.cast())`,
        options: [
          "FIRE! Inferno: 100 dmg",
          "FIRE! Inferno: 150 dmg",
          "Inferno: 100 dmg",
          "AttributeError: __power is private"
        ],
        answer: 1,
        solution: {
          steps: [
            { title: "Create FireSpell object", explanation: "FireSpell inherits from Spell. __init__ sets name='Inferno', __power=50.", code: `s = FireSpell("Inferno", 50)` },
            { title: "FireSpell.cast() is called", explanation: "FireSpell overrides cast(), so its version runs (polymorphism).", code: `def cast(self):\n    return f"FIRE! {self.name}: {self._Spell__power * 3} dmg"` },
            { title: "Name mangling for private attr", explanation: "__power becomes _Spell__power — accessible via name mangling from subclass.", code: `self._Spell__power  # = 50` },
            { title: "Calculate and return", explanation: "50 * 3 = 150. Output: FIRE! Inferno: 150 dmg", code: `print(s.cast())  # FIRE! Inferno: 150 dmg` }
          ],
          finalCode: `class Spell:\n    def __init__(self, name, power):\n        self.name = name\n        self.__power = power\n\nclass FireSpell(Spell):\n    def cast(self):\n        return f"FIRE! {self.name}: {self._Spell__power * 3} dmg"\n\ns = FireSpell("Inferno", 50)\nprint(s.cast())  # FIRE! Inferno: 150 dmg`
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────
  // WORLD 7: The Final Frontier
  // ─────────────────────────────────────────────────────────
  {
    id: 7,
    title: "The Final Frontier",
    subtitle: "Advanced Python",
    icon: "🔥",
    color: "#dc2626",
    bgGradient: "linear-gradient(135deg, #1a0000 0%, #2d0000 100%)",
    xpReward: 500,
    lessons: [
      {
        id: "7-1",
        title: "File I/O",
        icon: "📁",
        xp: 50,
        content: `
          <h2>Reading & Writing Files</h2>
          <p>Python can read and write files using the built-in <code>open()</code> function.</p>
          <div class="code-block">
<pre><span class="cmt"># Writing to a file</span>
<span class="cf">with</span> <span class="fn">open</span>(<span class="str">"quest_log.txt"</span>, <span class="str">"w"</span>) <span class="cf">as</span> f:
    f.<span class="method">write</span>(<span class="str">"Hero defeated the boss!\n"</span>)
    f.<span class="method">write</span>(<span class="str">"XP gained: 500\n"</span>)

<span class="cmt"># Reading from a file</span>
<span class="cf">with</span> <span class="fn">open</span>(<span class="str">"quest_log.txt"</span>, <span class="str">"r"</span>) <span class="cf">as</span> f:
    content = f.<span class="method">read</span>()
    <span class="fn">print</span>(content)

<span class="cmt"># Appending (add without overwriting)</span>
<span class="cf">with</span> <span class="fn">open</span>(<span class="str">"quest_log.txt"</span>, <span class="str">"a"</span>) <span class="cf">as</span> f:
    f.<span class="method">write</span>(<span class="str">"World 2 cleared!\n"</span>)</pre>
          </div>
          <div class="tip-box">💡 Always use <code>with</code> — it automatically closes the file!</div>
        `,
        quiz: [
          { q: "What mode opens a file for writing (overwrites)?", options: ["r", "w", "a", "x"], answer: 1 },
          { q: "The 'with' statement ensures the file is?", options: ["Opened twice", "Automatically closed", "Read-only", "Encrypted"], answer: 1 },
          { q: "Mode 'a' opens a file for?", options: ["Read only", "Write and overwrite", "Append without overwriting", "Binary write"], answer: 2 }
        ]
      },
      {
        id: "7-2",
        title: "Error Handling",
        icon: "🛡️",
        xp: 55,
        content: `
          <h2>try / except / finally</h2>
          <p>Error handling lets you <strong>catch and respond to errors</strong> gracefully instead of crashing.</p>
          <div class="code-block">
<pre><span class="cf">try</span>:
    <span class="kw">damage</span> = <span class="fn">int</span>(<span class="fn">input</span>(<span class="str">"Enter damage: "</span>))
    result = <span class="num">100</span> / damage
    <span class="fn">print</span>(<span class="str">f"Result: {result}"</span>)

<span class="cf">except</span> <span class="cls">ValueError</span>:
    <span class="fn">print</span>(<span class="str">"⚠️ Please enter a number!"</span>)

<span class="cf">except</span> <span class="cls">ZeroDivisionError</span>:
    <span class="fn">print</span>(<span class="str">"⚠️ Cannot divide by zero!"</span>)

<span class="cf">except</span> <span class="cls">Exception</span> <span class="cf">as</span> e:
    <span class="fn">print</span>(<span class="str">f"Unknown error: {e}"</span>)

<span class="cf">finally</span>:
    <span class="fn">print</span>(<span class="str">"This always runs!"</span>)</pre>
          </div>
        `,
        quiz: [
          { q: "What block catches errors?", options: ["try", "except", "finally", "catch"], answer: 1 },
          { q: "Which block always runs, error or not?", options: ["try", "except", "finally", "else"], answer: 2 },
          { q: "int('hello') raises which error?", options: ["TypeError", "ValueError", "NameError", "SyntaxError"], answer: 1 }
        ]
      },
      {
        id: "7-3",
        title: "Modules & Packages",
        icon: "📦",
        xp: 55,
        content: `
          <h2>Using Modules</h2>
          <p>Modules are Python files you can import to use their code. Python comes with many built-in modules.</p>
          <div class="code-block">
<pre><span class="cf">import</span> math
<span class="cf">import</span> random
<span class="cf">from</span> datetime <span class="cf">import</span> datetime

<span class="fn">print</span>(math.<span class="method">sqrt</span>(<span class="num">16</span>))         <span class="cmt"># 4.0</span>
<span class="fn">print</span>(math.<span class="method">pi</span>)                <span class="cmt"># 3.14159...</span>
<span class="fn">print</span>(random.<span class="method">randint</span>(<span class="num">1</span>, <span class="num">100</span>)) <span class="cmt"># random number 1-100</span>
<span class="fn">print</span>(datetime.<span class="method">now</span>())        <span class="cmt"># current time</span>

<span class="cmt"># Your own module: save as mymodule.py</span>
<span class="cf">def</span> <span class="fn">spell_damage</span>(power):
    <span class="cf">return</span> power * <span class="num">2.5</span>

<span class="cmt"># In another file:</span>
<span class="cf">from</span> mymodule <span class="cf">import</span> spell_damage</pre>
          </div>
        `,
        quiz: [
          { q: "How do you import the math module?", options: ["use math", "import math", "include math", "require math"], answer: 1 },
          { q: "from math import sqrt imports?", options: ["The whole math module", "Only the sqrt function", "Math and sqrt", "Nothing"], answer: 1 },
          { q: "random.randint(1, 6) returns?", options: ["Always 1", "A float", "An int 1-6", "An int 1-5"], answer: 2 }
        ]
      },
      {
        id: "7-4",
        title: "Decorators & Generators",
        icon: "✨",
        xp: 60,
        content: `
          <h2>Decorators</h2>
          <p>Decorators <strong>wrap a function</strong> to add extra behavior without changing its code.</p>
          <div class="code-block">
<pre><span class="cf">def</span> <span class="fn">power_up</span>(func):
    <span class="cf">def</span> <span class="fn">wrapper</span>(*args, **kwargs):
        <span class="fn">print</span>(<span class="str">"⚡ Power surge!"</span>)
        result = <span class="fn">func</span>(*args, **kwargs)
        <span class="fn">print</span>(<span class="str">"⚡ Power faded."</span>)
        <span class="cf">return</span> result
    <span class="cf">return</span> wrapper

<span class="cls">@power_up</span>
<span class="cf">def</span> <span class="fn">cast_spell</span>():
    <span class="fn">print</span>(<span class="str">"🔥 Fireball!"</span>)

<span class="fn">cast_spell</span>()
<span class="cmt"># ⚡ Power surge!</span>
<span class="cmt"># 🔥 Fireball!</span>
<span class="cmt"># ⚡ Power faded.</span></pre>
          </div>
          <h2>Generators</h2>
          <div class="code-block">
<pre><span class="cf">def</span> <span class="fn">level_up</span>(start, end):
    <span class="cf">for</span> lv <span class="kw">in</span> <span class="fn">range</span>(start, end+<span class="num">1</span>):
        <span class="cf">yield</span> lv  <span class="cmt"># Yields one at a time!</span>

<span class="cf">for</span> level <span class="kw">in</span> <span class="fn">level_up</span>(<span class="num">1</span>, <span class="num">5</span>):
    <span class="fn">print</span>(<span class="str">f"Reached Level {level}"</span>)</pre>
          </div>
        `,
        quiz: [
          { q: "Decorators are applied with which symbol?", options: ["#", "$", "@", "&"], answer: 2 },
          { q: "The 'yield' keyword is used in?", options: ["Classes", "Decorators", "Generators", "Modules"], answer: 2 },
          { q: "Generators produce values?", options: ["All at once", "One at a time", "Randomly", "In reverse"], answer: 1 }
        ]
      }
    ],
    boss: {
      name: "The Daemon King",
      title: "Final Boss — World 7",
      icon: "👑",
      hp: 100,
      description: "THE FINAL BATTLE! The Daemon King rules the Final Frontier with advanced Python sorcery. Defeat him to claim the title of Python Master!",
      xpReward: 500,
      questions: [
        { q: "Which file mode appends without overwriting?", options: ["w", "r", "a", "x"], answer: 2 },
        { q: "What block in try/except always runs?", options: ["try", "except", "else", "finally"], answer: 3 },
        { q: "from math import pi imports?", options: ["The math module", "The pi constant", "A function", "A class"], answer: 1 },
        { q: "What does yield do in a generator?", options: ["Returns and exits", "Produces a value and pauses", "Breaks the loop", "Raises an error"], answer: 1 },
        { q: "1/0 raises?", options: ["ValueError", "TypeError", "ZeroDivisionError", "ArithmeticError"], answer: 2 },
        { q: "Decorators use which prefix symbol?", options: ["#", "@", "$", "!"], answer: 1 },
        { q: "The 'with' statement is used for?", options: ["Loops", "Conditions", "Context managers (files)", "Classes"], answer: 2 },
        { q: "random.choice(['a','b','c']) returns?", options: ["All elements", "One random element", "'a' always", "An index"], answer: 1 }
      ],
      practicalProblem: {
        description: "What is the final value printed by this advanced Python code?",
        codeSnippet: `import math

def log_call(func):
    def wrapper(*args):
        result = func(*args)
        print(f"Called with {args} -> {result}")
        return result
    return wrapper

@log_call
def hypotenuse(a, b):
    return round(math.sqrt(a**2 + b**2), 2)

hypotenuse(3, 4)`,
        options: [
          "Called with (3, 4) -> 5.0",
          "Called with (3, 4) -> 7.0",
          "5.0",
          "Error — decorator syntax wrong"
        ],
        answer: 0,
        solution: {
          steps: [
            { title: "Decorator wraps hypotenuse", explanation: "@log_call replaces hypotenuse with wrapper(). When called, wrapper runs first.", code: `@log_call\ndef hypotenuse(a, b): ...\n# equivalent to: hypotenuse = log_call(hypotenuse)` },
            { title: "Call wrapper(3, 4)", explanation: "wrapper receives args=(3, 4). It calls the original hypotenuse(3, 4).", code: `result = func(3, 4)` },
            { title: "Calculate hypotenuse", explanation: "sqrt(3² + 4²) = sqrt(9+16) = sqrt(25) = 5.0. round(5.0, 2) = 5.0.", code: `math.sqrt(3**2 + 4**2)  # 5.0` },
            { title: "Print from wrapper", explanation: "print outputs: Called with (3, 4) -> 5.0", code: `print(f"Called with {(3,4)} -> {5.0}")  # Called with (3, 4) -> 5.0` }
          ],
          finalCode: `import math\n\ndef log_call(func):\n    def wrapper(*args):\n        result = func(*args)\n        print(f"Called with {args} -> {result}")\n        return result\n    return wrapper\n\n@log_call\ndef hypotenuse(a, b):\n    return round(math.sqrt(a**2 + b**2), 2)\n\nhypotenuse(3, 4)  # Called with (3, 4) -> 5.0`
        }
      }
    }
  }
];

// Ranks based on total XP
const RANKS = [
  { name: "Novice", minXP: 0, icon: "🥚", color: "#94a3b8" },
  { name: "Apprentice", minXP: 500, icon: "⚔️", color: "#22c55e" },
  { name: "Coder", minXP: 1000, icon: "🔮", color: "#00d4ff" },
  { name: "Wizard", minXP: 1800, icon: "🧙", color: "#a855f7" },
  { name: "Architect", minXP: 2500, icon: "🏛️", color: "#f59e0b" },
  { name: "Legend", minXP: 3000, icon: "👑", color: "#dc2626" }
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  return rank;
}
