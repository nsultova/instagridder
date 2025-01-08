import os
from flask import Flask, render_template, request, redirect
from werkzeug.utils import secure_filename

app = Flask(__name__)


UPLOAD_FOLDER = 'static/images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index_page():
    # Get list of images from upload directory
    images = []
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        images.append(filename)
    return render_template('index.html', images=images)