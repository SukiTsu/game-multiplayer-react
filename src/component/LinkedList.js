class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }

    print(){
        console.log("Value"+this.value+", next:"+this.next)
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.size = 0;
    }
  
    // Ajouter à la fin
    append(value) {
      const newNode = new Node(value);
      this.size++;
      if (!this.head) {
        this.head = newNode;
        return;
      }
  
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
  
      current.next = newNode;
    }

    getIndice(indice) {
        if (this.size === 0) return;
    
        indice = indice % this.size;
        let value;
        // Si on doit supprimer la tête
        if (indice === 0) {
            console.log("Remove head");
            value = this.head.value
            this.head = this.head.next;
            this.size--;
            return value;
        }
    
        let x = 0;
        let current = this.head;
    
        // On s'arrête juste avant l'élément à supprimer
        while (current && x < indice - 1) {
            current = current.next;
            x++;
        }
    
        // Sécurité : si current ou current.next est null (pas de suppression possible)
        if (!current || !current.next) return;
        
        value = current.next.value;
        console.log("Supprimé:", current.next.value);
        current.next = current.next.next;
        this.size--;
        return value;
    }
    
  
    // Afficher les valeurs
    print() {
      let current = this.head;
      while (current) {
        console.log(current.value);
        current = current.next;
      }
    }
  
    // Supprimer une valeur
    remove(value) {
      if (!this.head) return;
  
      if (this.head.value === value) {
        this.head = this.head.next;
        return;
      }
  
      let current = this.head;
      while (current.next && current.next.value !== value) {
        current = current.next;
      }
  
      if (current.next) {
        current.next = current.next.next;
      }
    }
  }

export default LinkedList