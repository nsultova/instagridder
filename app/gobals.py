from . import app
# The context processor can add new variables to all templates globally. This
# makes "render_template" behave as if all of these extra variables were passed
# to it every time.
#
# This is useful, for example, for providing data for the navigation bar. It
# needs a list of Pages, Categories, and Galleries from the database. Since the
# nav bar is shown on all pages, it makes sense to add that to the context
# processor rather than to every route.
#
# https://flask.palletsprojects.com/en/3.0.x/templating/#context-processors
@app.context_processor
def template_context():
    return {
        "site_name": "Neda's portfolio",

    }
