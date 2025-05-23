const words = [
  "abandon",
  "beacon",
  "candy",
  "dove",
  "eagle",
  "flame",
  "grape",
  "happy",
  "ice",
  "jungle",
  "kingdom",
  "lunar",
  "mango",
  "noble",
  "ocean",
  "petal",
  "quest",
  "river",
  "shadow",
  "train",
  "umbrella",
  "vivid",
  "whale",
  "basket",
  "yellow",
  "zebra",
  "angel",
  "brave",
  "crane",
  "dusk",
  "enigma",
  "frost",
  "glow",
  "honey",
  "index",
  "juice",
  "knight",
  "lunar",
  "magic",
  "night",
  "oasis",
  "pearl",
  "quill",
  "rose",
  "scent",
  "tiger",
  "unity",
  "vortex",
  "wind",
  "xray",
  "yogurt",
  "zoned",
  "atlas",
  "bliss",
  "cider",
  "dawn",
  "epoch",
  "flame",
  "gauge",
  "heaven",
  "irony",
  "jolly",
  "koala",
  "lamb",
  "mint",
  "neon",
  "opal",
  "plum",
  "quartz",
  "ruby",
  "sunset",
  "tango",
  "urban",
  "vogue",
  "wave",
  "xerox",
  "yearn",
  "zephyr",
  "aqua",
  "bold",
  "crisp",
  "dove",
  "edge",
  "forge",
  "grace",
  "hush",
  "ink",
  "jade",
  "kite",
  "leaf",
  "mist",
  "navy",
  "oak",
  "pale",
  "quilted",
  "rare",
  "stone",
  "tone",
  "urban",
  "vibes",
  "wisp",
  "yacht",
  "zeal",
  "arc",
  "blaze",
  "core",
  "dust",
  "echo",
  "flint",
  "gaze",
  "halo",
  "iron",
  "june",
  "kale",
  "lime",
  "moss",
  "nest",
  "ore",
  "peach",
  "quail",
  "ridge",
  "snow",
  "tide",
  "use",
  "vow",
  "window",
  "xmas",
  "yoga",
  "zoo",
  "amber",
  "breeze",
  "clover",
  "drift",
  "enjoy",
  "flame",
  "grin",
  "hatch",
  "icicle",
  "jazz",
  "knack",
  "latch",
  "mocha",
  "nail",
  "open",
  "pale",
  "quiz",
  "rust",
  "sail",
  "tide",
  "ugly",
  "vowed",
  "wool",
  "xenon",
  "yawned",
  "zone",
  "awe",
  "belt",
  "charm",
  "dome",
  "elixir",
  "fawn",
  "gala",
  "hop",
  "inc",
  "june",
  "knot",
  "lump",
  "moon",
  "noon",
  "opal",
  "pier",
  "quiver",
  "ride",
  "stare",
  "twin",
  "unit",
  "vase",
  "wax",
  "yolk",
  "zoom",
  "arrow",
  "brick",
  "cloud",
  "dune",
  "eagle",
  "frost",
  "grip",
  "haze",
  "ignite",
  "jacket",
  "lure",
  "mesh",
  "nest",
  "ogre",
  "puff",
  "quilt",
  "rave",
  "swoop",
  "track",
  "urge",
  "view",
  "windy",
  "yell",
  "zen",
  "bolt",
  "clip",
  "deep",
  "echo",
  "flare",
  "gaze",
  "heron",
  "iris",
  "jolt",
  "key",
  "lily",
  "mint",
  "nook",
  "olive",
  "plow",
  "quill",
  "rust",
  "sage",
  "tick",
  "uniform",
  "vibe",
  "whip",
  "yarn",
  "zoomed",
  "art",
  "blow",
  "core",
  "dove",
  "eagle",
  "foam",
  "gloom",
  "hand",
  "ice",
  "joke",
  "knee",
  "loaf",
  "melt",
  "note",
  "open",
  "pale",
  "quill",
  "roar",
  "slug",
  "tear",
  "urge",
  "blank",
  "wait",
  "yawn",
  "zinc",
];

 //Getting HTML elements
 const textContainer = document.getElementById("text-container");
 const timerElement = document.getElementById("timer");
 const tryAgainButton = document.getElementById("try-again");
 const finalScoreElement = document.getElementById("final-score");

  //Calculating how many words were correctly typed
  let totalWordsTyped = "";
  let currentCharIndex = 0;
  let errors = 0;
  let timeLeft = 60;
  let timerInterval;
  let typingStarted = false;

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()) {
  alert("This app is not for mobile use sorry");
  textContainer.innerHTML = "Sorry this app is not mobile friendly";
  timerElement.style.display = 'none';
} else {


  let shuffledWords = getShuffledWords();
  textContainer.innerHTML = shuffledWords;

  // Shuffle the words from the array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Create a log string of shuffed words
  function getShuffledWords() {
    let longSuffledWords = shuffleArray([...words]);
    return longSuffledWords.join(" ");
  }

  //Starting our timer
  function startTimer() {
    if (!typingStarted) {
      typingStarted = true;
      timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endTest();
        }
      }, 1000);
    }
  }

  // Test results
  function endTest() {
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM: ${calculateWPM()}`;
    textContainer.style.display = "none";
    tryAgainButton.style.display = "block";
  }

  //Calulate Words per minute with error
  function calculateWPM() {
    const wordsTyped = totalWordsTyped.trim().split(/\s+/).length;
    const baseWPM = Math.round((wordsTyped / 60) * 60);
    const adjustedWPM = Math.max(baseWPM - errors, 0);
    return adjustedWPM;
  }

  //Handle the keyboard letters over the already given text and also scroll the text accordignly
  document.addEventListener("keydown", (e) => {
    startTimer();
    if (e.key === "Backspace") {
      if (totalWordsTyped.length > 0) {
        currentCharIndex = Math.max(currentCharIndex - 1, 0);
        totalWordsTyped = totalWordsTyped.slice(0, -1);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      totalWordsTyped += e.key;
      currentCharIndex++;
    }

    const textArray = shuffledWords.split("");
    textContainer.innerHTML = "";

    errors = 0;

    for (let i = 0; i < textArray.length; i++) {
      const span = document.createElement("span");

      if (i < totalWordsTyped.length) {
        if (totalWordsTyped[i] === textArray[i]) {
          span.classList.add("correct");
        } else {
          span.classList.add("error");
          errors++;
        }
      }

      span.textContent = textArray[i];
      textContainer.appendChild(span);
    }

    //Scroll the container only after 20 characters
    if (totalWordsTyped.length >= 20) {
      const scrollAmount = (totalWordsTyped.length - 20) * 14;
      textContainer.scrollLeft = scrollAmount;
    }
  });

  tryAgainButton.addEventListener("click",
    restTest);

  //Reset Test
  // Reset Test
  function restTest() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerElement.textContent = `Time Left ${timeLeft}`;
    finalScoreElement.textContent = "";
    textContainer.style.display = "block";
    tryAgainButton.style.display = "none";
    totalWordsTyped = "";
    typingStarted = false;
    currentCharIndex = 0;
    errors = 0;
    textContainer.scrollLeft = 0;

    // Clear the textContainer content
    textContainer.innerHTML = "";

    // Reinitialize the textContainer with shuffled words
    shuffledWords = getShuffledWords();
    textContainer.innerHTML = shuffledWords;
  }
}
