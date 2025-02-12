from flask import Flask, render_template, request, jsonify

import search_algorithm
import complexity_measure

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search", methods=['POST'])
def search_api():
    data = request.get_json()
    items = data.get('items', [])
    search_item = data.get('searchValue')
    #result_indexes = search_algorithm.search(search_item, items)

    result_indexes,operations,time_taken,memory_taken = complexity_measure.measure_complexity(search_item, items)
    return jsonify({'indexes': result_indexes, 'operations': operations, 'time': time_taken, 'space': memory_taken})


if __name__ == "__main__":
    app.run()
