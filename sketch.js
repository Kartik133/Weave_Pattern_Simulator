let ppi = 72;
let pick_repeat = 8;
let reed = [72, 2];
let reed_space = 65;
let epi = 72;

let draft = [1,2,3,4,5,6,7,8];

let peg_plan = [[2,6],[1,2,4,5,6,8],[4,8],[2,3,4,6,7,8],[3,7],[1,3,4,5,7,8],[1,5],[1,2,3,5,6,7]];

let inch = 400;
let count_denier_warp = 480;
let count_denier_weft = 480;
let count_Ne_warp;
let count_Ne_weft;
let inputs = {};
let allElements = [];
let t1;
let t2;

let x = 40;
let y = 30;
let gap = 40;

let warp_colours = [];
let weft_colours = [];

function setup() {

  createCanvas(windowWidth, 1300);

  background(100);

  // ---------- TITLE ----------
  let title = createElement("h2", "Fabric Input Form");
  title.position(x, y);
  allElements.push(title);

  y += 60;

  // ---------- NORMAL INPUTS ----------
  createInputField("ppi", /*ppi*/0);
  createInputField("pick_repeat", /*pick_repeat*/0);
  createInputField("reed_space", /*reed_space*/0);
  createInputField("epi", /*epi*/0);
  createInputField("inch", /*inch*/0);
  createInputField("count_denier_warp", 0);
  createInputField("count_denier_weft", 0);

  // ---------- REED ----------
  let reedLabel = createDiv("<b>Reed (format: 72,2)</b>");
  reedLabel.position(x, y);
  allElements.push(reedLabel);

  y += 25;

  inputs.reed = createInput(/*"72,2"*/"0,0");
  inputs.reed.position(x, y);
  inputs.reed.size(250);

  allElements.push(inputs.reed);

  y += gap + 10;

  // ---------- WARP COLOUR ----------
let warpColourLabel = createDiv("<b>Warp Colours (format: blue,2,red,3)</b>");
warpColourLabel.position(x, y);
allElements.push(warpColourLabel);

y += 25;

inputs.warpColours = createInput("");
inputs.warpColours.position(x, y);
inputs.warpColours.size(250);
allElements.push(inputs.warpColours);

y += gap + 10;


// ---------- WEFT COLOUR ----------
let weftColourLabel = createDiv("<b>Weft Colours (format: blue,2,red,3)</b>");
weftColourLabel.position(x, y);
allElements.push(weftColourLabel);

y += 25;

inputs.weftColours = createInput("");
inputs.weftColours.position(x, y);
inputs.weftColours.size(250);
allElements.push(inputs.weftColours);

y += gap + 10;

  // ---------- DRAFT ----------
  let draftTitle = createDiv("<b>Draft Sequence</b>");
  draftTitle.position(x, y);
  allElements.push(draftTitle);

  y += 25;

  let draftInfo = createDiv("Click buttons in required order");
  draftInfo.position(x, y);
  allElements.push(draftInfo);

  y += 35;

  let draftBox = createDiv("");
  draftBox.position(x, y);

  draftBox.style("padding", "10px");
  draftBox.style("min-height", "30px");
  draftBox.style("background", "#ffffff");
  draftBox.style("border", "1px solid black");
  draftBox.style("width", "300px");

  allElements.push(draftBox);

  y += 60;

  let draftArr = [];

  for(let i=1;i<=24;i++) {

    let b = createButton(i);

    b.position(x + ((i-1)%12)*45, y + floor((i-1)/12)*40);

    b.mousePressed(() => {

      draftArr.push(i);

      draftBox.html(draftArr.join(" , "));
    });

    allElements.push(b);
  }

  y += 90;

  let draftUndo = createButton("Undo Draft");

  draftUndo.position(x, y);

  draftUndo.mousePressed(() => {

    draftArr.pop();

    draftBox.html(draftArr.join(" , "));
  });

  allElements.push(draftUndo);

  y += 70;

  // ---------- PEG PLAN ----------
  let pegTitle = createDiv("<b>Peg Plan Builder</b>");
  pegTitle.position(x, y);
  allElements.push(pegTitle);

  y += 25;

  let pegInfo = createDiv(
    "Select numbers for one row, then press ADD ROW"
  );

  pegInfo.position(x, y);
  allElements.push(pegInfo);

  y += 35;

  let currentRow = [];
  let pegRows = [];

  let currentRowBox = createDiv("");

  currentRowBox.position(x, y);

  currentRowBox.style("padding", "10px");
  currentRowBox.style("background", "#ffffff");
  currentRowBox.style("border", "1px solid black");
  currentRowBox.style("width", "300px");

  allElements.push(currentRowBox);

  y += 60;

  let allRowsBox = createDiv("");

  allRowsBox.position(x + 650, y - 60);

  allRowsBox.style("padding", "10px");
  allRowsBox.style("background", "#f5f5f5");
  allRowsBox.style("border", "1px solid black");
  allRowsBox.style("width", "300px");
  allRowsBox.style("min-height", "200px");

  allElements.push(allRowsBox);

  for(let i=1;i<=24;i++) {

    let b = createButton(i);

    b.position(x + ((i-1)%12)*45, y + floor((i-1)/12)*40);

    b.mousePressed(() => {

      currentRow.push(i);

      currentRow = [...new Set(currentRow)];

      currentRowBox.html(currentRow.join(" , "));
    });

    allElements.push(b);
  }

  y += 100;

  let addRowBtn = createButton("ADD ROW");

  addRowBtn.position(x, y);

  addRowBtn.mousePressed(() => {

    if(currentRow.length > 0) {

      pegRows.push([...currentRow]);

      currentRow = [];

      currentRowBox.html("");

      displayPegRows();
    }
  });

  allElements.push(addRowBtn);

  let undoRowBtn = createButton("Undo Last Row");

  undoRowBtn.position(x + 120, y);

  undoRowBtn.mousePressed(() => {

    pegRows.pop();

    displayPegRows();
  });

  allElements.push(undoRowBtn);

  function displayPegRows() {

    let txt = "";

    for(let i=0;i<pegRows.length;i++) {

      txt += "[" + pegRows[i].join(", ") + "]<br>";
    }

    allRowsBox.html(txt);
  }

  y += 90;

  // ---------- SUBMIT ----------
  let submitBtn = createButton("SUBMIT");

  submitBtn.position(x, y);

  submitBtn.style("font-size", "20px");
  submitBtn.style("padding", "10px");

  submitBtn.mousePressed(() => {

    // normal values
    ppi = Number(inputs.ppi.value());

    pick_repeat = Number(inputs.pick_repeat.value());

    reed_space = Number(inputs.reed_space.value());

    epi = Number(inputs.epi.value());

    inch = Number(inputs.inch.value());

    count_denier_warp = Number(inputs.count_denier_warp.value());
    count_denier_weft = Number(inputs.count_denier_weft.value());

    // reed
    reed = inputs.reed.value()
      .split(",")
      .map(x => Number(x.trim()));

    // draft
    draft = [...draftArr];

    // peg plan
    peg_plan = pegRows.map(r => [...r]);

    // ---------- WARP COLOUR ARRAY ----------
warp_colours = [];

let warpData = inputs.warpColours.value()
  .split(",")
  .map(x => x.trim());

for(let i = 0; i < warpData.length; i += 2) {
  let colour = warpData[i];
  let repeat = Number(warpData[i + 1]);

  for(let j = 0; j < repeat; j++) {
    warp_colours.push(colour);
  }
}


// ---------- WEFT COLOUR ARRAY ----------
weft_colours = [];

let weftData = inputs.weftColours.value()
  .split(",")
  .map(x => x.trim());

for(let i = 0; i < weftData.length; i += 2) {
  let colour = weftData[i];
  let repeat = Number(weftData[i + 1]);

  for(let j = 0; j < repeat; j++) {
    weft_colours.push(colour);
  }
}

console.log("Warp:", warp_colours);
console.log("Weft:", weft_colours);

    // ---------- REMOVE ALL FORM ELEMENTS ----------
    for(let el of allElements) {
      el.remove();
    }

    // Scroll webpage to top
    window.scrollTo(0, 0);

    // ---------- CALL YOUR FUNCTION ----------
    drawWeavePattern();
  });

  allElements.push(submitBtn);
}


// ---------- INPUT FIELD FUNCTION ----------
function createInputField(name, defaultValue) {

  let label = createDiv("<b>" + name + "</b>");

  label.position(x, y);

  allElements.push(label);

  y += 25;

  inputs[name] = createInput(String(defaultValue));

  inputs[name].position(x, y);

  inputs[name].size(250);

  allElements.push(inputs[name]);

  y += gap;
}


// ---------- YOUR MAIN FUNCTION ----------
function drawWeavePattern() {
  resizeCanvas(inch*10.5,inch*10.5);
  background(100);

  count_Ne_warp=5315/count_denier_warp;
  t1=14.28346456692913/sqrt(count_Ne_warp);
  count_Ne_weft=5315/count_denier_weft;
  t2=14.28346456692913/sqrt(count_Ne_weft);
  rectMode(CENTER);
  textAlign(CENTER);

  for(let i=1;i<=ppi*10;i++) {
    push();
    stroke(/*255,0,0*/weft_colours[(i - 1) % weft_colours.length]);
    strokeWeight(t2);
    line(0,(i*inch/ppi)-(inch/2)/ppi,inch*10,(i*inch/ppi)-(inch/2)/ppi);
    pop();
  }

  for(let i=1;i<=epi*10;i++) {
    push();
    stroke(/*0,255,0*/warp_colours[(i - 1) % warp_colours.length]);
    strokeWeight(t1);
    line((i*inch/epi)-(inch/2)/epi,0,(i*inch/epi)-(inch/2)/epi,inch*10);
    pop();
  }

  for(let i=1;i<=ppi*epi*100;i++) {
    let pic_number=floor((i-1)/(epi*10))+1;
    let end_number=(i-1)%(epi*10)+1;
    
    push();

    let a,b;

    //console.log(i,pic_number,end_number,a,b,peg_plan[a],draft[b]);

     a = (pic_number-1)%pick_repeat;
     b = (end_number-1)%draft.length;

    if(peg_plan[a].includes(draft[b])) {
      fill(/*0,255,0*/warp_colours[(end_number - 1) % warp_colours.length]);
    }else{
      fill(/*255,0,0*/weft_colours[(pic_number - 1) % weft_colours.length]);
    }
    noStroke();
    rect((end_number*inch/epi)-(inch/2)/epi,(pic_number*inch/ppi)-(inch/2)/ppi,t1,t2);
    pop();
  }

  for(let i=0;i<=10;i++) {
    push();
    stroke(0);
    strokeWeight(1);
    line(0,i*inch,10*inch,i*inch);
    pop();

    push();
    noStroke();
    fill(0);
    textSize(20);
    text(i,10,20+i*inch);
    pop();
  }

  for(let i=0;i<=10;i++) {
    push();
    stroke(0);
    strokeWeight(1);
    line(i*inch,0,i*inch,10*inch);
    pop();

    push();
    noStroke();
    fill(0);
    textSize(20);
    text(i,10+i*inch,20);
    pop();
  }
}