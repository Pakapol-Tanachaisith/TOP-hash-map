class HashMap {
  #bucketList;
  #loadFactorThreshold;
  #initialCapacity;

  constructor(initialCapacity = 16, loadFactorThreshold = 0.75) {
    this.#bucketList = new Array(initialCapacity).fill(null);
    this.#loadFactorThreshold = loadFactorThreshold;
    this.#initialCapacity = initialCapacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#bucketList.length;
    }

    return hashCode;
  }

  print() {
    console.log(this.#bucketList);
  }

  #entryCount() {
    const buckets = this.#bucketList;

    return buckets.reduce((acc, bucket) => {
      const nodeCount = bucket?.length || 0;
      return acc + nodeCount;
    }, 0);
  }

  #loadFactor() {
    const entryCount = this.#entryCount();

    return entryCount / this.#bucketList.length;
  }

  #indexOfKey(bucketIndex, key) {
    let result = -1;
    const bucket = this.#bucketList[bucketIndex];

    if (!Array.isArray(bucket)) return result;

    bucket.find((item, i) => {
      if (item[0] === key) {
        result = i;
      }
    });

    return result;
  }

  #growBuckets() {
    const expandedBuckets = [
      ...this.#bucketList,
      new Array(this.#bucketList).fill(null),
    ];

    this.#bucketList = expandedBuckets;
  }

  set(key, value) {
    const bucketIndex = this.hash(key);

    // The bucket is empty
    if (!this.#bucketList[bucketIndex]) {
      this.#bucketList[bucketIndex] = [[key, value]];
    } else {
      const itemIndex = this.#indexOfKey(bucketIndex, key);

      // Duplicated key in the bucket - Overwrite the vale
      if (itemIndex >= 0) {
        this.#bucketList[bucketIndex][itemIndex][1] = value;
      } else {
        this.#bucketList[bucketIndex].push([key, value]);
      }
    }

    const currentLoad = this.#loadFactor();
    if (currentLoad > this.#loadFactorThreshold) {
      this.#growBuckets();
    }
  }

  get(key) {
    const bucketIndex = this.hash(key);

    const bucket = this.#bucketList[bucketIndex];

    if (!bucket) return null;

    const itemIndex = this.#indexOfKey(bucketIndex, key);
    return itemIndex >= 0 ? bucket[itemIndex][1] : null;
  }

  has(key) {
    const bucketIndex = this.hash(key);
    const bucket = this.#bucketList[bucketIndex];

    if (!bucket) return false;

    const itemIndex = this.#indexOfKey(bucketIndex, key);

    return itemIndex >= 0;
  }

  remove(key) {
    const bucketIndex = this.hash(key);
    const bucket = this.#bucketList[bucketIndex];

    if (!bucket) return;

    const itemIndex = this.#indexOfKey(bucketIndex, key);
    console.log({ itemIndex });
    if (itemIndex < 0) return;
    bucket.splice(itemIndex, 1);
  }

  clear() {
    this.#bucketList = new Array(this.#initialCapacity).fill(null);
  }

  length() {
    return this.#entryCount();
  }

  keys() {
    const buckets = this.#bucketList;
    const allKeys = [];

    buckets.forEach((bucket) => {
      if (Array.isArray(bucket)) {
        const keys = bucket.map((item) => {
          const [key, _] = item;
          return key;
        });

        allKeys.push(...keys);
      }
    });

    return allKeys;
  }

  values() {
    const buckets = this.#bucketList;
    const allValues = [];

    buckets.forEach((bucket) => {
      if (Array.isArray(bucket)) {
        const values = bucket.map((item) => {
          const [_, value] = item;
          return value;
        });

        allValues.push(...values);
      }
    });

    return allValues;
  }

  entries() {
    const buckets = this.#bucketList;
    const allEntries = [];

    buckets.forEach((bucket) => {
      if (Array.isArray(bucket)) {
        bucket.forEach((item) => {
          allEntries.push(item);
        });
      }
    });

    return allEntries;
  }
}

export default HashMap;
