from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json, time, random



with open("recipes.json") as f:
    data = json.load(f)

# Setup Chrome
options = Options()
# options.add_argument("--headless")  # comment this if you want to see the browser
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)



def extract_recipe(url):
    print(f"Fetching: {url}")
    try:
        driver.get(url)

        # Wait up to 10s for the main content to appear
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "entry-content"))
        )

        html = driver.page_source
        if "sgcaptcha" in html:
            print("Blocked by CAPTCHA, skipping.")
            return None

        soup = BeautifulSoup(html, "html.parser")

        title = soup.find("h1").get_text(strip=True) if soup.find("h1") else "Untitled"
        content = soup.find("div", class_="entry-content")

        info = []
        if content:
            image_tag = content.find("img")
            if image_tag and image_tag.get("src"):
                image_url = image_tag["src"]

            for tag in content.find_all(["p", "h2", "h3", "ul", "ol"]):
                text = tag.get_text(strip=True)
                if text:
                    info.append(text)
        else:
            print("Could not find entry-content section.")
            return None


        return {"title": title, "image_url": image_url, "url": url, "information": "  ".join(info)}

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None


detailed_data = []
for category in data:
    recipes_with_details = []
    

    for recipe in category["recipes"]:
        print(f"\nScraping: {recipe['title']}")
        details = extract_recipe(recipe['url'])
        

        if details:
            details['category'] = category['category']
            recipes_with_details.append(details)
        else:
            print("Skipped due to error or block.")

        time.sleep(random.uniform(1, 3))


    detailed_data.append({
        "recipes": recipes_with_details
    })



with open("nigerian_recipes.json", "w") as f:
    json.dump(detailed_data, f, indent=2)



driver.quit()
print("Done. All recipes saved.")