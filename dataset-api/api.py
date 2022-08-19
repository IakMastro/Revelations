import re
import json
import numpy as np
import pandas as pd

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# Debug flag, currently set to true
DEBUG: bool = True

# Flack documentation
app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

def check_extention(file_name: str) -> str:
  if re.search(r'\.csv$', file_name):
    return 'csv'

  elif re.search(r'\.xls$', file_name) or re.search(r'\.xlsx$', file_name):
    return 'xls'

  elif re.search(r'\.json$', file_name):
    return 'json'

@app.route("/", methods=["POST"])
@cross_origin()
def index():
  response_object = {}
  data = request.get_json()
  path = "/files/" + data["path"]

  if check_extention(path) == 'csv':
    df = pd.read_csv(path)
    return df.to_json(orient="records")

  elif check_extention(path) == 'xls':
    df = pd.read_excel(path)
    return df.to_json(orient="records")

  elif check_extention(path) == 'json':
    df = pd.read_json(path)
    return df.to_json(orient="records")

  else:
    response_object["error"] = "File type not supported."

  return jsonify(response_object)


if __name__ == '__main__':
  app.run(debug=DEBUG)
