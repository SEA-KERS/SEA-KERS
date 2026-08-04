import csv
import os
import re
import ssl
import urllib.request

def fetch_linkedin_images():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    csv_path = os.path.join(base_dir, 'team.csv')
    team_img_dir = os.path.join(base_dir, 'public', 'images', 'team')
    os.makedirs(team_img_dir, exist_ok=True)

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    }

    if not os.path.exists(csv_path):
        print("team.csv not found.")
        return

    with open(csv_path, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    fetched = 0
    for row in rows:
        link = row.get('linkedin', '').strip()
        m_id = row.get('id', '').strip()
        if not link or not m_id:
            continue

        print(f"Checking LinkedIn profile for {row.get('name')} ({m_id})...")
        try:
            req = urllib.request.Request(link, headers=headers)
            with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
                
                # Look for og:image meta tag
                match = re.search(r'<meta\s+(?:property|name)=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
                if not match:
                    match = re.search(r'<meta\s+content=["\']([^"\']+)["\']\s+(?:property|name)=["\']og:image["\']', html)
                
                if match:
                    img_url = match.group(1).replace('&amp;', '&')
                    # Exclude LinkedIn default logo/icon og:image
                    if 'static.licdn.com' not in img_url and 'ghost' not in img_url:
                        print(f"  Found profile image: {img_url[:70]}...")
                        img_req = urllib.request.Request(img_url, headers=headers)
                        with urllib.request.urlopen(img_req, timeout=10, context=ctx) as img_resp:
                            img_data = img_resp.read()
                            dest_path = os.path.join(team_img_dir, f"{m_id}.jpg")
                            with open(dest_path, 'wb') as img_file:
                                img_file.write(img_data)
                            print(f"  Successfully saved profile photo to {dest_path}!")
                            fetched += 1
                    else:
                        print(f"  LinkedIn returned default static logo for {m_id}.")
                else:
                    print(f"  No og:image found for {m_id}.")
        except Exception as e:
            print(f"  Could not auto-fetch for {m_id}: {e}")

    print(f"\nCompleted: {fetched}/{len(rows)} images fetched.")

if __name__ == '__main__':
    fetch_linkedin_images()
