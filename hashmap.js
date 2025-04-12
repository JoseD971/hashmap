class HashMap {
  constructor (initialCapacity = 8, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for(let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if(bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({key, value});
    this.size++;

    if(this.size / this.capacity > this.loadFactor) { 
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if(bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keys = [];

    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        keys.push(entry.key);
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        values.push(entry.value);
      }
    }

    return values;
  }

  entries() {
    const entries = [];
  
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }
  
    return entries;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
  
}

export default HashMap;