class HashSet {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.size = 0;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
  
    hash(key) {
      let hashCode = 0;
      const prime = 31;
  
      for (let i = 0; i < key.length; i++) {
        hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
      }
  
      return hashCode;
    }
  
    add(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let entry of bucket) {
        if (entry === key) return; // Ya existe
      }
  
      bucket.push(key);
      this.size++;
  
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      return bucket.includes(key);
    }
  
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      const keyIndex = bucket.indexOf(key);
      if (keyIndex !== -1) {
        bucket.splice(keyIndex, 1);
        this.size--;
        return true;
      }
  
      return false;
    }
  
    clear() {
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    length() {
      return this.size;
    }
  
    keys() {
      const keys = [];
  
      for (let bucket of this.buckets) {
        for (let key of bucket) {
          keys.push(key);
        }
      }
  
      return keys;
    }
  
    values() {
      return this.keys();
    }
  
    entries() {
      return this.keys().map(key => [key, key]);
    }
  
    resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
  
      for (let bucket of oldBuckets) {
        for (let key of bucket) {
          this.add(key);
        }
      }
    }
}

export default HashSet;