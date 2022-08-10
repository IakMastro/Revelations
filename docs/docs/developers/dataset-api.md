---
sidebar_position: 3
---

# Dataset API

Let's take a quick look to the simple Dataset API.

## Flask

Flask is a web framework for Python that implements a REST API.

:::tip A minimal API

Check [this very minimal API](https://flask.palletsprojects.com/en/2.2.x/quickstart/#a-minimal-application) from the official documentation.

Flask can be very simple and beginner to understand, especially for Python devs.

:::

## Pandas and NumPy

Pandas and NumPy are two of the most useful tools to use for data analysis in Python.

:::tip

Check what can be done with both [NumPy](https://numpy.org/) and [Pandas](https://pandas.pydata.org/).

:::

## Example - Return the contents of a CSV file

To return the contents of the file, firstly we need to configure the route.

```py
@app.route("/", methods=["POST"])
@cross_origin()
def index():
  ...
```

This will hit on ``curl -X POST localhost:5000`` and not in GET.

Next, we need to get the data from the request.

```py
def index():
  data = request.get_json()
  path = "/files" + data["path"]

  ...
```

Finally, let's add the pandas, read the content and return the object.

```py
def index():
  ...

  df = pd.read_csv(path)
  response_object["content"] = df.to_dict(orient="records")

  return jsonify(response_object)
```

#### Complete code

```py
@app.route("/", methods=["POST"])
@cross_origin()
def index():
  data = request.get_json()
  path = "/files" + data["path"]

  df = pd.read_csv(path)
  response_object["content"] = df.to_dict(orient="records")

  return jsonify(response_object)
```