const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialCharacters = [
    "~",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "{",
    "[",
    "}",
    "]",
    ",",
    "|",
    ":",
    ";",
    "<",
    ">",
    ".",
    "?",
    "/",
];

const pwdLengthEl = document.getElementById("pwd-length");

document.addEventListener("click", (e) => {
    const pwdLength = pwdLengthEl.value;
    const alertSuccess = document.getElementById("copy-success").style;
    const alertFail = document.getElementById("copy-failure").style;
    if (e.target.id === "generate-pwd-btn" && pwdLength >= 10) {
        const useNumbers = document.getElementById("numbers-checkbox").checked;
        const useSpecialCharacters = document.getElementById(
            "special-characters-checkbox"
        ).checked;
        const arrayOfPwd = generatePasswords(pwdLength, [
            useNumbers,
            useSpecialCharacters,
        ]);
        renderNewPasswords(arrayOfPwd);
    } else if (e.target.id === "generate-pwd-btn" && pwdLength < 10) {
        console.log("You need to use at least 10 characters!");
    } else if (e.target.className === "pwd-element") {
        try {
            navigator.clipboard.writeText(e.target.innerText);
            alertSuccess.display = "inline";
            setTimeout(() => {
                alertSuccess.display = "none";
            }, 2000);
        } catch (err) {
            alertFail.display = "inline";
            setTimeout(() => {
                alertFail.display = "none";
            }, 2000);
        }
    }
});

function generatePasswords(pwdLength, arrsToUse) {
    pwdLength = parseInt(pwdLength);
    const usedArr =
        arrsToUse[0] && arrsToUse[1]
            ? letters.concat(numbers, specialCharacters)
            : arrsToUse[0]
            ? letters.concat(numbers)
            : arrsToUse[1]
            ? letters.concat(specialCharacters)
            : letters;
    const arrayOfPwd = [];
    let newPwd = "";
    for (let i = 0; i < pwdLength * 4; i++) {
        newPwd += getLetter(usedArr);
        if (newPwd.length === pwdLength) {
            arrayOfPwd.push(newPwd);
            newPwd = "";
            continue;
        }
    }

    return arrayOfPwd;
}

function randomNum(min, max) {
    const range = max - min + 1;
    const bytes_needed = Math.ceil(Math.log2(range) / 8);
    const cutoff = Math.floor(256 ** bytes_needed / range) * range;
    const bytes = new Uint8Array(bytes_needed);
    let value;
    do {
        crypto.getRandomValues(bytes);
        value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0);
    } while (value >= cutoff);
    return min + (value % range);
}

function getLetter(array) {
    const randNum = randomNum(0, array.length - 1);
    return array[randNum];
}

function renderNewPasswords(arrayOfPwd) {
    const pwdContainer = document.getElementById("pwd-container");
    const fragment = document.createDocumentFragment();
    const alertMsg = document.querySelector(".copy-alert").style;
    for (let pwd of arrayOfPwd) {
        const pwdEl = document.createElement("p");
        pwdEl.className = "pwd-element";
        pwdEl.textContent = pwd;
        fragment.append(pwdEl);
    }
    pwdContainer.innerHTML = "";
    pwdContainer.append(fragment);
}
