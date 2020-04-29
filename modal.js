function Modal ( node, priority = null ) {
  if ( !( typeof node === "string" && ( this.node = document.querySelector(node)) )
    && !( typeof node === "object" && ( this.node = node ) && node.ownerDocument === document ) ) {
    throw "Not a valid DOM node or selector";
  }
  this.priority = priority;
  if (!this.node.hasAttribute("init")) {
    this.shadow = document.createElement("div");
    this.shadow.className = "shadow";
    this.shadow.addEventListener("click", ()=>{
      this.close();
    });
    this.node.appendChild(this.shadow);
    this.node.setAttribute("tabindex", 0);
    this.node.addEventListener("click", (e)=>{e.stopPropagation()});
    this.node.addEventListener("keyup", (e)=>{
      if (e.keyCode == 27) this.close();
    });
    if (this.node.querySelector(".footer>.close")) 
      this.node.querySelector(".footer>*.close").addEventListener("click", ()=> { this.close(); });
  } else {
    this.shadow = this.node.querySelector(".shadow");
  }
}
Modal.prototype.open = function ( priority = null ) {
  this.priority = (priority === null && this.priority === null) ? "low" : priority || this.priority ;
  this.node.classList.add("visible");
  this.node.setAttribute("priority", this.priority);
  this.node.focus();
  this.shadow.classList.remove("hidden");
  this.isOpen = true;
}
Modal.prototype.close = function () {
  this.node.classList.remove("visible");
  this.shadow.classList.add("hidden");
  this.isOpen = false;
}
Modal.priority = {LOW:"low", MEDIUM: "medium", HIGH: "high"};


