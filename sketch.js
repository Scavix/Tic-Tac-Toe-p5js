var game;
var sentinel;
var why;
function setup() {
  createCanvas(600, 600);
  reset();
}

function draw() {
  background('green');
  game.drawMe();
}

const winReason = {
  oriz: 'by orizontal check',
  vert: 'by vertical check',
  diag: 'by diagonal check',
}

const status = {
  empty: 0,
  cross: 1,
  circle: -1,
};

const turn = {
  me: 1,
  you: -1,
};

class Cell {
  constructor(h, w, s) {
    this.h = h;
    this.w = w;
    this.s = s;
  }
}

class GameField{
  constructor(){
    this.grid=this.init();
  }
  init(){
    var result = [];
    for(let i=0;i<3;i++){
      result[i] = [];
      for(let j=0;j<3;j++){
        result[i][j] = new Cell(200,200,status.empty);
      }
    }
    return result;
  }
  drawMe(){
    for(let i=0;i<3;i++){
      fill('black');
      line(0+200*i,0,0+200*i,600);
      line(0,0+200*i,600,0+200*i);
      for(let j=0;j<3;j++){
        if(this.grid[i][j].s==1){
          fill('red');
          circle(100+200*(i),100+200*(j),100);
        }
        if(this.grid[i][j].s==-1){
          fill('blue');
          circle(100+200*(i),100+200*(j),100);
        }
      }
    }
    line(600,0,600,600);
    line(0,600,600,600);
  }
  do(i,j){
    if(this.grid[i][j].s!=status.empty){return;}
    if(sentinel==1){
      this.grid[i][j].s=status.cross;
    }
    if(sentinel==-1){
      this.grid[i][j].s=status.circle;
    }
    this.winCheck();
    if(sentinel==1){sentinel=-1;}
    else{sentinel=1;}
  }
  diag(){
    if(((this.grid[0][0].s == this.grid[1][1].s)&&(this.grid[1][1].s == this.grid[2][2].s)&&(this.grid[0][0].s != status.empty))||((this.grid[2][0].s == this.grid[1][1].s)&&(this.grid[1][1].s == this.grid[0][2].s)&&(this.grid[2][0].s != status.empty))){
      why=winReason.diag;
      return true;
    }
    return false;
  }
  vert(){
    let tmp0=[];
    let tmp1=[];
    let tmp2=[];
    let val0,val1,val2;
    for(let i=0;i<3;i++){
      tmp0.push(this.grid[0][i].s);
      tmp1.push(this.grid[1][i].s);
      tmp2.push(this.grid[2][i].s);
    }
    val0=((tmp0[0]==tmp0[1])&&(tmp0[1]==tmp0[2])) && (!(tmp0[0]==0));
    val1=((tmp1[0]==tmp1[1])&&(tmp1[1]==tmp1[2])) && (!(tmp1[0]==0));
    val2=((tmp2[0]==tmp2[1])&&(tmp2[1]==tmp2[2])) && (!(tmp2[0]==0));
    if(val0||val1||val2){
      why=winReason.vert;
      return true;
    }
    return false;
  }
  oriz(){
    let tmp0=[];
    let tmp1=[];
    let tmp2=[];
    let val0,val1,val2;
    for(let i=0;i<3;i++){
      tmp0.push(this.grid[i][0].s);
      tmp1.push(this.grid[i][1].s);
      tmp2.push(this.grid[i][2].s);
    }
    val0=((tmp0[0]==tmp0[1])&&(tmp0[1]==tmp0[2])) && (!(tmp0[0]==0));
    val1=((tmp1[0]==tmp1[1])&&(tmp1[1]==tmp1[2])) && (!(tmp1[0]==0));
    val2=((tmp2[0]==tmp2[1])&&(tmp2[1]==tmp2[2])) && (!(tmp2[0]==0));
    
    if(val0||val1||val2){
      why=winReason.oriz;
      return true;
    }
    return false;
  }
  end(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
          if(this.grid[i][j].s==status.empty){
            return false;
        }
      }
    }
    return true;
  }
  winCheck(){
    if(this.diag()||this.oriz()||this.vert()){
      setTimeout(() => {alert("Someone won "+why)}, 500);
      setTimeout(() => {reset()}, 2000);
      return;
    }
    if(this.end()){
      setTimeout(() => {alert("No one won")}, 500);
      setTimeout(() => {reset()}, 2000);
      return;
    }
  }
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  if(x>600||y>600){return;}
  if(x<201){x=0;}
  else if(x<401){x=1;}
  else if(x<601){x=2;}
  if(y<201){y=0;}
  else if(y<401){y=1;}
  else if(y<601){y=2;}
  game.do(x,y);
}

function reset(){
  game = new GameField();
  sentinel = turn.me;
}