class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
    
  }
  
  html(string) {
    if(!string){
      return this.elements[0].innerHTML;
    }
    else{
      this.elements.forEach( (el) => {
        el.innerHTML = string;
      });
    }
  }
  
  empty(){
    this.html(" ");
  }
  
  append(content) {
    this.elements.forEach((el) => {
      if(content.constructor === String){
        el.innerHTML += content;
      }
      else if (content.constructor === HTMLElement) {
        el.innerHTML += content.outerHTML;
      }
      else {
        console.log("hey !");
        content.elements.forEach((cont) => {
          el.innerHTML += cont.outerHTML;
        });
      }
    });
  }
  
  attr(name,setter){
    if (!setter) {
      return this.getAttribute(name);
    }
    else {
      this.setAttribute(name,setter);
    }
  }
  
  addClass(name){
    this.elements.forEach((el) => {
      el.classList.add(name);
    });
  }
  
  removeClass(name){
    this.elements.forEach((el) => {
      el.classList.remove(name);
    });
  }
  
  children(){
    let ele = [];
    this.elements.forEach((el) => {
      ele.concat(Array.from(el.childNodes));
    });
    return new DOMNodeCollection(ele);
  }
  
  parent() {
    let parents = [];
    this.elements.forEach( (el) => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }
  
  find(selector) {
    let descendants = [];
    this.elements.forEach((el) => {
      // debugger
      descendants = descendants.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(descendants);
  }
  
  remove(){
    this.elements.forEach( (el) => {
      debugger 
      this.find(el).forEach(child => {
        child.html(" ");
        el.removeChild(child);
      });
      el.html(" ");
      el.parentNode.removeChild(el);
    });
  }
  
}
module.exports = DOMNodeCollection;