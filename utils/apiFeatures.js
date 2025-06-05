class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Modify to find name that contains a word
    if (queryObj.name) {
      queryStr = queryStr.replace(/"name":"(.*?)"/g, (match, p1) => {
        return `"name": { "$regex": "${p1}", "$options": "i" }`;
      });
    }
    // Modify to find title that contains a word
    if (queryObj.title) {
      queryStr = queryStr.replace(/"title":"(.*?)"/g, (match, p1) => {
        return `"title": { "$regex": "${p1}", "$options": "i" }`;
      });
    }

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //2. Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  //3. Field limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  //4. Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
