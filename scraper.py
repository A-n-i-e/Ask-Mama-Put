import requests
import time, random
import json
from bs4 import BeautifulSoup

url = "https://www.allnigerianrecipes.com/other/sitemap/"
html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")


data = []

for h2 in soup.find_all("h2"):
    category = h2.get_text(strip=True)
    ul = h2.find_next_sibling("ul")
    if not ul:
        continue

    recipes = []
    for a in ul.find_all("a", href=True):
        recipes.append({
            "title": a.get_text(strip=True),
            "url": a['href']
        })
        time.sleep(random.uniform(1, 3))  # polite pause


    data.append({
        "category": category,
        "recipes": recipes
    })

print("Found", len(data), "categories with recipes.")
for category in data:
    print(f"Category: {category['category']} : {len(category['recipes'])} recipes")

with open("recipes.json", "w") as f:
    json.dump(data, f, indent=2)



