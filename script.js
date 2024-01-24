"use strict";
let alfabet = [];
let nowyAlfabet = [];
let klucz;
let keyArr = [];
let iloscKolumn;
let keyOrder = [];
let ilePustych = 0;
const keyToArr = function () {
  let tmp;
  tmp = klucz.split("");

  for (let i = 0; i < klucz.length; i++) {
    keyArr[i] = tmp[i];
  }
};

const alfabetInputAppend = function () {
  const tabela = document.querySelector(".alfa");

  for (let i = 0; i < 5; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let input = document.createElement("input");
      input.classList.add("form-control-sm", "input", "value" + i + j);
      tr.appendChild(input);
    }
    tabela.appendChild(tr);
  }
};

alfabetInputAppend();
const wczytajAlfabet = function () {
  nowyAlfabet = [];

  for (let i = 0; i < 5; i++) {
    nowyAlfabet[i] = [];

    for (let j = 0; j < 7; j++) {
      let input = document.querySelector(".value" + i + j);

      if (input) {
        let inputValue = input.value;
        nowyAlfabet[i][j] = inputValue;
      }
    }
  }
};

const czyPuste = function () {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      if (nowyAlfabet[i][j] === "") {
        ilePustych++;
      }
    }
  }
};
const szyfrowanie = function () {
  wczytajAlfabet();
  czyPuste();
  let kluczInput = document.querySelector(".klucz");
  klucz = kluczInput.value;
  iloscKolumn = klucz.length;
  if (ilePustych === 0) {
    alfabet = nowyAlfabet;
  } else {
    alert(
      "nie wprowadziłeś wszystkich liter alfabetu, zostanie wykorzystana domyślna kolejność alfabetu"
    );
    if (klucz === "") {
      alert(
        "nie wprowadziłeś klucza, klucz przyjmie domyślną wartość: 'klucz'"
      );
      klucz = "klucz";
    }
    ilePustych = 0;
    alfabet = [
      //      0    1    2    3    4    5    6
      /*0*/ ["a", "ą", "b", "c", "ć", "d", "e"],
      /*1*/ ["ę", "f", "g", "h", "i", "j", "k"],
      /*2*/ ["l", "ł", "m", "n", "ń", "o", "ó"],
      /*3*/ ["p", "q", "r", "s", "ś", "t", "u"],
      /*4*/ ["v", "w", "x", "y", "z", "ź", "ż"],
    ];
  }

  let charArr = [];
  let inputUser;
  let lokacjaIndeks = [];
  const wczytajinput = function () {
    inputUser = document.querySelector(".tekstjawny").value;
    inputUser = inputUser.replace(/\s+/g, "");
    charArr = inputUser.split("");
  };

  const indeks = function (arr) {
    let i = 0;
    let j = 0;
    let x = 0;
    while (x < arr.length) {
      for (i = 0; i < alfabet.length; i++) {
        for (j = 0; j < 7; j++) {
          if (alfabet[i][j] === arr[x]) {
            lokacjaIndeks[x] = "" + i + j;
            x++;
            i = 0;
            j = 0;
          }
        }
      }
    }
  };
  keyToArr();
  wczytajinput();
  indeks(charArr);
  let tmp2 = lokacjaIndeks.length * 2;
  let rowNumber = Math.ceil(tmp2 / iloscKolumn) + 1;
  let splitedLokacja = [];

  for (let i = 0; i < lokacjaIndeks.length; i++) {
    let digits = lokacjaIndeks[i].toString().split("").map(Number);
    splitedLokacja = splitedLokacja.concat(digits);
  }

  const dodatkowaSzyfracja = function (arr) {
    let ileDwojek = 0;
    let ilePiatek = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 2) ileDwojek++;
      if (arr[i] === 5) ilePiatek++;
    }
    function losowaLiczbaZakres(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const ileLosDwojek = losowaLiczbaZakres(0, ileDwojek);
    const ileLosPiatek = losowaLiczbaZakres(0, ilePiatek);
    let tmp3 = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 2 && tmp3 < ileLosDwojek) {
        arr[i] = 7;
        tmp3++;
      }
    }
    let tmp4 = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 5 && tmp4 < ileLosPiatek) {
        arr[i] = 8;
        tmp4++;
      }
    }
  };
  dodatkowaSzyfracja(splitedLokacja);
  let szyfrkluczArr = [
    ["", ""],
    ["", ""],
  ];
  const szyfrKluczem = function () {
    iloscKolumn = klucz.length;

    tmp2 = lokacjaIndeks.length * 2;
    rowNumber = Math.ceil(tmp2 / iloscKolumn) + 1;

    let x = 0;
    for (let i = 0; i < rowNumber - 2; i++) {
      szyfrkluczArr.push([]);
    }
    for (let i = 0; i < iloscKolumn; i++) {
      szyfrkluczArr[0][i] = keyArr[i];
    }
    for (let j = 1; j < rowNumber; j++) {
      for (let i = 0; i < iloscKolumn; i++) {
        if (typeof splitedLokacja[x] == "undefined") {
          splitedLokacja[x] = 9;
          szyfrkluczArr[j][i] = splitedLokacja[x];
          x++;
        } else {
          szyfrkluczArr[j][i] = splitedLokacja[x];
          x++;
        }
      }
    }
  };

  szyfrKluczem();

  const transposition = function () {
    let x = 0;
    let sortedKey = [...keyArr].sort();
    // [...keyArr] tworzenie nowej tablicy zeby przy
    //wywolaniu funkcji drugi raz nie tablica nie byla poprzestawiana
    const keyOrd = function () {
      while (x !== keyArr.length)
        for (let i = 0; i < klucz.length; i++) {
          if (szyfrkluczArr[0][i] === sortedKey[x]) {
            keyOrder[x] = i;
            x++;
          }
        }
    };
    keyOrd();
    let extractedColumn = szyfrkluczArr.map((row) => [row[keyOrder[0]]]);
    for (let i = 1; i < klucz.length; i++) {
      let extractedColumn2 = szyfrkluczArr.map((row) => [row[keyOrder[i]]]);

      extractedColumn = extractedColumn.map((column, index) =>
        column.concat(extractedColumn2[index])
      );
    }

    let doStringa = [];
    let z = 0;
    for (let i = 1; i < extractedColumn.length; i++) {
      for (let j = 0; j < keyArr.length; j++) {
        doStringa[z] = extractedColumn[i][j];
        z++;
      }
    }
    let zaszyfrowanaWiadomosc = doStringa.join("").replace(/,/g, ""); // wrzucamy tablice Dostringa i usuwamy przecinki
    let result = zaszyfrowanaWiadomosc.replace(/(.{2})/g, "$1 "); //dodajemy spacje co drugi znak dla lepszej czytelnosci
    let SzyfrResult = document.querySelector(".zaszyfrowanytekst");
    SzyfrResult.value = result;
  };
  transposition();
};
const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener("click", szyfrowanie);

//
//#
// DESZYFRACJA
//#
//

const funkcjadeszyfracji = function () {
  wczytajAlfabet();
  czyPuste();
  let kluczInput = document.querySelector(".klucz");
  klucz = kluczInput.value;
  if (ilePustych === 0) {
    alfabet = nowyAlfabet;
  } else {
    alert(
      "nie wprowadziłeś wszystkich liter alfabetu, zostanie wykorzystana domyślna kolejność alfabetu"
    );
    if (klucz === "") {
      alert(
        "nie wprowadziłeś klucza, klucz przyjmie domyślną wartość: 'klucz'"
      );
      klucz = "klucz";
    }
    keyToArr();
    ilePustych = 0;
    iloscKolumn = klucz.length;
    alfabet = [
      //      0    1    2    3    4    5    6
      /*0*/ ["a", "ą", "b", "c", "ć", "d", "e"],
      /*1*/ ["ę", "f", "g", "h", "i", "j", "k"],
      /*2*/ ["l", "ł", "m", "n", "ń", "o", "ó"],
      /*3*/ ["p", "q", "r", "s", "ś", "t", "u"],
      /*4*/ ["v", "w", "x", "y", "z", "ź", "ż"],
    ];
  }
  let charArrayDecipher = [];
  let inputUser2;
  let odszyfrowanyTekst = [];
  let deszyfrkluczArr = [
    ["", ""],
    ["", ""],
  ];

  const wczytajinput2 = function () {
    inputUser2 = document.querySelector(".tekstniejawny").value;
    inputUser2 = inputUser2.replace(/\s+/g, "");
    charArrayDecipher = inputUser2.split("");
  };
  wczytajinput2();

  const stringTo2dAr = function () {
    let tmp2 = charArrayDecipher.length * 2;
    let rowNumber = Math.ceil(tmp2 / iloscKolumn) + 1;

    for (let i = 0; i < rowNumber - 2; i++) {
      deszyfrkluczArr.push([]);
    }
    let sortedKeyArr = [...keyArr].sort();
    for (let i = 0; i < iloscKolumn; i++) {
      deszyfrkluczArr[0][i] = sortedKeyArr[i];
    }
    let x = 0;
    for (let j = 1; j < rowNumber; j++) {
      for (let i = 0; i < iloscKolumn; i++) {
        if (x < charArrayDecipher.length) {
          deszyfrkluczArr[j][i] = charArrayDecipher[x];
          x++;
        }
      }
    }
  };
  stringTo2dAr();

  let keyArr2 = [];

  const keyToArr2 = function () {
    let tmp;
    tmp = klucz.split("");

    for (let i = 0; i < klucz.length; i++) {
      keyArr2[i] = tmp[i];
    }
  };
  keyToArr2();

  let keyOrder2 = [];
  let y = 0;

  while (y !== keyArr2.length)
    for (let i = 0; i < klucz.length; i++) {
      if (deszyfrkluczArr[0][i] === keyArr2[y]) {
        keyOrder2[y] = i;
        y++;
      }
    }

  deszyfrkluczArr = deszyfrkluczArr.filter((row) => row.length > 0);
  let extractedColumn3;
  const transpozycja2 = function () {
    extractedColumn3 = deszyfrkluczArr.map((row) => [row[keyOrder2[0]]]);

    for (let i = 1; i < klucz.length; i++) {
      let extractedColumn5 = deszyfrkluczArr.map((row) => row[keyOrder2[i]]);

      extractedColumn3 = extractedColumn3.map((column, index) =>
        column.concat(extractedColumn5[index])
      );
    }
  };
  transpozycja2();

  let tablicaDoOdszyfr = [];
  const usunPierwszyRow = function () {
    let doStringa = [];
    let z = 0;

    for (let i = 1; i < extractedColumn3.length; i++) {
      for (let j = 0; j < keyArr2.length; j++) {
        z++;
        if (extractedColumn3[i][j] != 9)
          tablicaDoOdszyfr[z - 1] = extractedColumn3[i][j];
      }
    }
  };

  usunPierwszyRow();
  const dodatkowaDeszyfracja = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == 7) arr[i] = 2;
      if (arr[i] == 8) arr[i] = 5;
    }
  };
  dodatkowaDeszyfracja(tablicaDoOdszyfr);
  const deszyfracja = function (arr) {
    let z = 0;
    for (let i = 0; i < arr.length; i += 2) {
      odszyfrowanyTekst[z] = alfabet[arr[i]][arr[i + 1]];
      z++;
    }
  };
  deszyfracja(tablicaDoOdszyfr);
  let koncowyWynik = odszyfrowanyTekst.join("");
  let SzyfrResult2 = document.querySelector(".odszyfrowanytekst");
  SzyfrResult2.value = koncowyWynik;
};

const submitBtn2 = document.querySelector(".submitBtn2");
submitBtn2.addEventListener("click", funkcjadeszyfracji);
