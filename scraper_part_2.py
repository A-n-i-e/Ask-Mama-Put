import json

with open('recipes.json', 'r') as file:
    recipes = json.load(file)

for recipe in recipes:
    category = recipe['category']

    for rec in recipe['recipes']:
        title = rec['title']
        url = rec['url']

def extract_recipes(url):
    pass
