import csv
import os

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
csv_path = os.path.join(base_dir, 'team.csv')

core_members = [
    {"id": "kashvi-v", "name": "Kashvi V"},
    {"id": "spoorthi-r", "name": "Spoorthi R"},
    {"id": "anusha-rao", "name": "Anusha Rao"},
    {"id": "fardeen-s-khadri", "name": "Fardeen S Khadri"},
    {"id": "pramoda-s-r", "name": "Pramoda S R"},
    {"id": "manoj-gowda-r", "name": "Manoj Gowda R"},
]

other_members = [
    {"id": "reddy", "name": "Reddy"},
    {"id": "sujan", "name": "Sujan"},
    {"id": "afnaan", "name": "Afnaan"},
    {"id": "swathi", "name": "Swathi"},
    {"id": "manasa-r", "name": "Manasa R"},
    {"id": "priya", "name": "Priya"},
]

rows = []
for m in core_members + other_members:
    rows.append({
        "id": m["id"],
        "name": m["name"],
        "linkedin": "",
        "avatar": f"/images/team/{m['id']}.jpg"
    })

with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['id', 'name', 'linkedin', 'avatar'])
    writer.writeheader()
    writer.writerows(rows)

print(f"Successfully generated simplified team.csv with {len(rows)} real team members!")
