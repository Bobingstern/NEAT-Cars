class Editor{
  constructor(){
    this.drawing = false
    this.temp = []
    this.running = true
  }

  show(){
    for (var i=0;i<Default.length;i++){
      line(Default[i][0], Default[i][1], Default[i][2], Default[i][3])
    }

    if (this.drawing){
      strokeWeight(5)
      line(this.temp[0][0], this.temp[0][1], mouseX, mouseY)
    }
  }

  update(){

  }
}



function mouseClicked(){
  var flag = false
  if (editor.running){
    if (editor.drawing) {
      Map.push([editor.temp[0][0], editor.temp[0][1], mouseX, mouseY])
      editor.temp = []
      flag = true
      editor.drawing = false
    }

    if (!editor.drawing && !flag){
      editor.temp.push([mouseX, mouseY])
      editor.drawing = true
    }
  }
}



function keyPressed(){
  if (keyCode === ENTER){
    //Map.push([map[0][0], map[0][1], map[map.length-1][2], map[map.length-1][3]])
    editor.drawing = false
    editor.running = false
  }
}
